
use nanoid::nanoid;
use totp_rs::{Algorithm, TOTP};

use anyhow::Result;

use sqlx;

pub fn create_user_totp(email: String) -> Result<TOTP> {
    let issuer = match std::env::var("TOTP_ISSUER") {
        Ok(r) => {
            r
        }
        Err(_) => String::from("URLSlasher")
    };

    let totp = TOTP::new(Algorithm::SHA512, 6, 1, 30, nanoid!(64).into_bytes(), Some(issuer), email).unwrap();

    return Ok(totp);
}

