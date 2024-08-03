use nanoid::nanoid;
use totp_rs::{Algorithm, TOTP};

use anyhow::Result;

pub fn create_user_totp(email: String) -> Result<TOTP> {
    let issuer = std::env::var("TOTP_ISSUER").unwrap_or_else(|_| String::from("URLSlasher"));

    let totp = TOTP::new(
        Algorithm::SHA512,
        6,
        1,
        30,
        nanoid!(64).into_bytes(),
        Some(issuer),
        email,
    )
    .unwrap();

    Ok(totp)
}


pub fn create_default_admin() {

}