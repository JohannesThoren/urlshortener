#[macro_use]
extern crate rocket;

use anyhow::Result;
use chrono::{self, DateTime, Local};
use log::info;
use nanoid::nanoid;
use rocket::fs::FileServer;
use rocket::http::Method;
use rocket::response::Redirect;

use rocket_cors::{AllowedOrigins, CorsOptions};
use sqlx::sqlite::SqlitePoolOptions;

use sqlx::SqlitePool;

async fn insert_new_url(url: String, pool: &SqlitePool) -> Result<String> {
    let id = nanoid!(4);
    let datetime = chrono::offset::Local::now();

    let _ = sqlx::query("insert into urls (id, url, clicks, created) values ($1, $2, $3, $4)")
        .bind(id.clone())
        .bind(url.clone())
        .bind(0)
        .bind(datetime.to_string())
        .execute(pool)
        .await;

    Ok(id)
}

async fn get_url_from_id(
    id: String,
    pool: &SqlitePool,
) -> Result<(String, String, i32, DateTime<Local>)> {
    let res: (String, String, i32, DateTime<Local>) =
        sqlx::query_as("select * from urls where id = $1")
            .bind(id)
            .fetch_one(pool)
            .await?;
    Ok(res)
}

async fn increment_clicks(id: String, pool: &SqlitePool) -> Result<()> {
    sqlx::query("update urls set clicks=clicks+1 where id = $1")
        .bind(id)
        .execute(pool)
        .await?;
    Ok(())
}

#[get("/new_url?<url>")]
async fn new_url(url: &str, pool: &rocket::State<SqlitePool>) -> Result<String, String> {
    match insert_new_url(url.to_string(), pool.inner()).await {
        Ok(id) => match get_url_from_id(id.clone(), pool).await {
            Ok(res) => {
                info!("{:?}", res);
                Ok(id)
            }
            Err(e) => Err(e.to_string()),
        },
        Err(e) => Err(e.to_string()),
    }
}

#[get("/get_info/<id>")]
async fn get_info(id: &str, pool: &rocket::State<SqlitePool>) -> Result<String, std::io::Error> {
    match get_url_from_id(id.to_string(), pool).await {
        Ok(r) => {
            return Ok(format!(
                "{{\"id\":\"{}\",\"url\":\"{}\",\"clicks\":{},\"created\":\"{}\"}}",
                r.0,
                r.1,
                r.2,
                r.3.to_string()
            ))
        }
        Err(_) => todo!(),
    }
}

#[get("/<id>")]
async fn go_to_url(id: &str, pool: &rocket::State<SqlitePool>) -> Redirect {
    match get_url_from_id(id.to_string(), pool.inner()).await {
        Ok(res) => {
            let url = res.1;
            let _ = increment_clicks(id.to_string(), pool.inner()).await;
            Redirect::to(url)
        }
        Err(_) => Redirect::to("/404.html"),
    }
}

#[rocket::main]
async fn main() -> Result<()> {
    // create a pool and connect to database
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect(std::env::var("DATABASE_URL")?.as_str())
        .await?;

    // create the table on startup.
    sqlx::query(
        "create table if not exists urls (id text, url text, clicks int, created datetime)",
    )
    .execute(&pool)
    .await?;

    let cors = CorsOptions::default()
        .allowed_origins(AllowedOrigins::all())
        .allowed_methods(
            vec![Method::Get, Method::Post]
                .into_iter()
                .map(From::from)
                .collect(),
        )
        .allow_credentials(true)
        .to_cors()?;

    rocket::build()
        .attach(cors)
        .mount("/", FileServer::from("page"))
        .mount("/api/v1", routes![new_url, get_info])
        .mount("/u", routes![go_to_url])
        .manage(pool)
        .launch()
        .await?;

    Ok(())
}
