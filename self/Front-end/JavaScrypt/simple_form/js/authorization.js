function User(name, surname, age) {
  this.name = name;
  this.surname = surname;
  this.age = age;
  this.showInfo = function() {
    alert(
      this.name + '\n' +
      this.surname + '\n' +
      this.age + '\n'
    );
  }
}

let user = new User("Evgenii", "Kopanchuk", 18);

user.showInfo();