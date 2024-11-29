import {nanoid} from 'nanoid';

class Contact {
  constructor(name, email, phone) {
    this.id = nanoid();
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

export default Contact;