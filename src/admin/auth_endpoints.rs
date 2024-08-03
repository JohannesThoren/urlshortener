use crate::admin::auth::create_user_totp;
use crate::admin::database::insert_user;
use crate::models::totp_verify::TOTPVerify;
use rocket::form::Form;
use sqlx::SqlitePool;
use totp_rs::{Algorithm, Secret, TOTP};
use typed_html::dom::DOMTree;
use typed_html::elements::data;
use typed_html::html;

#[get("/test")]
pub async fn test_auth() -> Result<String, String> {
    match create_user_totp("johannes@lgjt.xyz".to_string()) {
        Ok(r) => Ok(format!("{:?}", r.get_secret_base32())),
        Err(_) => Err("error".to_string()),
    }
}

#[post("/register", data = "<email>")]
pub async fn register(email: Form<String>) -> String {
    match create_user_totp(email.to_string()) {
        Ok(r) => {
            let qr = format!("data:image/jpeg;base64, {}", r.get_qr_base64().unwrap());
            let secret = r.get_secret_base32();
            let email = r.account_name;
            let mut html: DOMTree<String> = html!(
                <div class="shadow-md p-2 rounded-md ">
                    <img class="mx-auto" src=qr/>

                    <form class="flex gap-5" action="/auth/verify/totp" method="post">
                        <input class="hidden" name="email" hidden="true" value=email />
                        <input class="hidden" name="secret" hidden="true" value=secret />
                        <input class="bg-gray-100 border-b p-1 flex-grow" type="text" name="code" id="code"/>
                        <input class=" transition-colors   border rounded-md p-2 bg-sky-500 text-white" type="submit" value="Verify"/>
                    </form>
                </div>

            );

            return html.to_string();
        }
        Err(e) => e.to_string(),
    }
}

#[post("/verify/totp", data = "<data>")]
pub async fn verify_totp(data: Form<TOTPVerify>, pool: &rocket::State<SqlitePool>) -> String {
    let secret = Secret::Encoded(data.secret.clone()).to_bytes().unwrap();
    let totp = TOTP::new(
        Algorithm::SHA512,
        6,
        1,
        30,
        secret,
        None,
        data.email.clone(),
    )
    .unwrap();

    let is_valid = totp.check_current(data.code.clone().as_str()).unwrap();

    if is_valid {
        insert_user(
            data.secret.clone(),
            data.email.clone(),
            pool.inner()
        ).await.unwrap();
    }
    "hej".to_string()
}
