use rocket::form::Form;
use sqlx::SqlitePool;

use crate::database::*;

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
                    "<a href=\"/u/{0}\" id=\"shortened-url\">{0}</a>",
                    res.id
                ))
            }
            Err(e) => Err(e.to_string()),
        },
        Err(e) => Err(e.to_string()),
    }
}

#[get("/url?<id>")]
pub async fn get_info(id: &str, pool: &rocket::State<SqlitePool>) -> String {
    match get_url_from_id(id.to_string(), pool).await {
        Ok(r) => {
            format!(
                r"
            <p>clicks {}</p>
            <p>url {}</p>
            <p>created {}</p>
        ",
                r.clicks,
                r.url,
                r.created
            )
        }
        Err(_) => String::from("<p>Not Found!</p>"),
    }
}
