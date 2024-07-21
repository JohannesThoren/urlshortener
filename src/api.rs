use sqlx::SqlitePool;

use crate::database::*;

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
pub async fn get_info(
    id: &str,
    pool: &rocket::State<SqlitePool>,
) -> Result<String, std::io::Error> {
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
