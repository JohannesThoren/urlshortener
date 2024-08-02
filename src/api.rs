use rocket::serde::json::Json;
use sqlx::SqlitePool;

use crate::{database::*, models::url::Url};

#[get("/new_url?<url>")]
pub async fn new_url(url: &str, pool: &rocket::State<SqlitePool>) -> Result<String, String> {
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
pub async fn get_info(id: &str, pool: &rocket::State<SqlitePool>) -> Json<Url> {
    match get_url_from_id(id.to_string(), pool).await {
        Ok(r) => return Json(r),
        Err(_) => todo!(),
    }
}
