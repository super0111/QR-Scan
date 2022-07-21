import config from "../config";

const postInfo = (formData) => {
    console.log("formmmmm", formData)
  return fetch(`${config.server_url}api/post/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData, // Use your own property name / key
    }),
  })
  .then((res) =>{
    return res.json();
  } );
};

export { postInfo }