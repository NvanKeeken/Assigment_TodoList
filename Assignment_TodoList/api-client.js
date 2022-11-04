const getData = async () => {
  try {
    const urlBase = " http://localhost:3000";
    const res = await fetch(urlBase, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  } catch {
    window.alert("error");
  }
};

const postData = async (todo) => {
  try {
    const baseUrl = "http://localhost:3000";
    const data = { discription: todo, done: "false" };
    const newTask = fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    window.alert("error");
  }
};

const deleteData = async (id) => {
  try {
    const urlBase = "http://localhost:3000";
    const urlEndpoint = `${urlBase}/${id}`;
    console.log(urlEndpoint);
    const res = await fetch(`${urlBase}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    window.alert("error");
  }
};

const updateDone = async (id, done) => {
  try {
    const urlBase = "http://localhost:3000";
    const data = { done: `${done}` };
    const urlEndpoint = `${urlBase}/${id}`;
    const newTask = fetch(urlEndpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    window.alert("error");
  }
};

const updateDiscription = async (id, discription) => {
  try {
    const urlBase = "http://localhost:3000";
    const data = { discription: `${discription}` };
    const urlEndpoint = `${urlBase}/${id}`;
    const newTask = fetch(urlEndpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    window.alert("error");
  }
};
