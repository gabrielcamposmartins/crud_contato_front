export default class UserService {
  requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: null,
    redirect: "follow",
  };

  teste() {
    alert("ok");
  }

  async getContacts() {
    this.requestOptions.method = "GET";
    let result = await fetch(
      "http://192.168.100.194:8080/contacts/",
      this.requestOptions
    ).catch((error) => console.log("error", error));

    result = await result.json();
    return result;
  }

  async insertContact(data) {
    this.requestOptions.method = "POST";
    this.requestOptions.body = JSON.stringify(data);
    let result = await fetch(
      "http://192.168.100.194:8080/contacts/",
      this.requestOptions
    ).catch((error) => console.log("error", error));

    return result;
  }

  async updateContact(id, data) {
    this.requestOptions.method = "PUT";
    this.requestOptions.body = JSON.stringify(data);
    let result = await fetch(
      "http://192.168.100.194:8080/contacts/" + id,
      this.requestOptions
    ).catch((error) => console.log("error", error));

    return result;
  }

  async deleteContact(id) {
    this.requestOptions.method = "DELETE";
    let result = await fetch(
      "http://192.168.100.194:8080/contacts/" + id,
      this.requestOptions
    ).catch((error) => console.log("error", error));

    return result;
  }
}
