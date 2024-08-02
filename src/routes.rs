use crate::{get_url_from_id, increment_clicks};
use rocket::response::Redirect;
use sqlx::SqlitePool;

#[get("/<id>")]
pub async fn go_to_url(id: &str, pool: &rocket::State<SqlitePool>) -> Redirect {
    match get_url_from_id(id.to_string(), pool.inner()).await {
        Ok(res) => {
            let url = res.url;
            let _ = increment_clicks(id.to_string(), pool.inner()).await;
            Redirect::to(url)
        }
        Err(_) => Redirect::to("/404.html"),
    }
}
