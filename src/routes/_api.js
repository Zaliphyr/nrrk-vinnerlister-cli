const base = "https://fauna-workers.nrrk-vinnerlister.workers.dev";
// const base = "http://127.0.0.1:8787";

export async function api(fetchMethod, resource, data) {
  // user must have a cookie set
  // if (!event.locals.userid) {
  // 	return { status: 401 };
  // }

  const res = await fetch(`${base}/${resource}`, {
    method: fetchMethod,
    headers: {
      "content-type": "application/json",
    },
    body: data && JSON.stringify(data),
  });

  if (res.headers.get("content-type") === "text/plain") {
    return {
      status: res.status,
    };
  }

  try {
    return {
      status: res.status,
      body: await res.json(),
    };
  } catch (err) {
    return {
      status: res.status,
    };
  }
}
