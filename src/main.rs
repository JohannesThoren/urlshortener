#[macro_use]
extern crate rocket;

mod api;
mod database;
mod models;
mod routes;
mod admin;

use api::{get_info, new_url};
use database::*;
use routes::*;

use anyhow::Result;
use rocket::fs::FileServer;
use rocket::http::Method;

use rocket_cors::{AllowedOrigins, CorsOptions};
use sqlx::sqlite::SqlitePoolOptions;

use dotenvy;

#[rocket::main]
async fn main() -> Result<()> {
    dotenvy::dotenv()?;
    // create a pool and connect to database
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect(std::env::var("DATABASE_URL")?.as_str())
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
        // .mount("/auth", routes![])
        .manage(pool)
        .launch()
        .await?;

    Ok(())
}
