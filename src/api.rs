use rocket::{form::Form, response::content, serde::json::Json};
use sqlx::SqlitePool;

use crate::{database::*, models::url::Url};

#[post("/url", data = "<url_input>")]
pub async fn new_url(
    url_input: Form<String>,
    pool: &rocket::State<SqlitePool>,
) -> Result<String, String> {
    match insert_new_url(url_input.to_string(), pool.inner()).await {
        Ok(id) => match get_url_from_id(id.clone(), pool).await {
            Ok(res) => {
                info!("{:?}", res);
                Ok(format!(
                    "<a href=\"/u/{0}\" id=\"shortend-url\">{0}</a>",
                    res.id
                ))
            }
            Err(e) => Err(e.to_string()),
        },
        Err(e) => Err(e.to_string()),
    }
}

#[get("/url?<urlid>")]
pub async fn get_info(urlid: &str, pool: &rocket::State<SqlitePool>) -> String {
    match get_url_from_id(urlid.to_string(), pool).await {
        Ok(r) => {
            return format!(
                r"
            <p>clicks {}</p>
            <p>url {}</p>
            <p>created {}</p>
        ",
                r.clicks,
                r.url,
                r.created.to_string()
            )
        }
        Err(_) => return String::from("<p>Not Found!</p>"),
    }
}
