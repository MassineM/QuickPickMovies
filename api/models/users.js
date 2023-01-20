class Users {
  constructor(
    id,
    pseudo,
    email,
    password,
    created_at,
    role,
    validation_password
  ) {
    this.id = id;
    this.pseudo = pseudo;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
    this.role = role;
    this.validation_password = validation_password;
  }
}
