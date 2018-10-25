/* global fetch */ //eslint
/**
 * Transport - wrapper for browser fetch API
 * methods:
 *  get - fetch a URL with type GET. Optionally can set data (body) and custom params.
 *  set - fetch a URL with type POST, data (body) is required and custom params are optional.
 *  __c - create a custom fetch request if you want to use other types such as PUT and DELETE.
 */
const transport = (function() {
  const _f = type => {
    if (!type) {
      type = "GET";
    }

    return async (url, data, opts) => {
      if (!url) {
        return new Error("URL required when fetching data!");
      }

      //* are default options
      let params = {
        body: data, // must match 'Content-Type' header
        cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, same-origin, *omit
        headers: {
          "Content-Type": "text/plain"
        },
        method: type, // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        redirect: "manual", // *manual, follow, error
        referrer: "client" // *client, no-referrer
      };

      if (!!opts && typeof opts === "object") {
        // basic object check sanitization
        params = Object.assign({}, params, opts); // new object is now params.
      }

      if (!!data && typeof data === "object") {
        data = Object.keys(data)
          .map(function(key) {
            return (
              encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
            );
          })
          .join("&")
          .replace(/%20/g, "+");
      }

      if (data) {
        // if there is data being passed in, we assume it needs to on the body and the content type header is for posting data.
        params.body = data;
        params.headers["Content-Type"] =
          "application/x-www-form-urlencoded; charset=UTF-8"; // update the content type when posting data
      } else {
        delete params.body;
      }

      // return fetch Promise
      return fetch(url, params)
        .then(response => {
          let contentType = response.headers.get("content-type");
          if (response.ok && contentType.indexOf("application/json") !== -1) {
            // check for JSON content type
            return Promise.resolve(response.json()); // parses response to JSON
          } else if (response.ok && response.text) {
            return Promise.resolve(response.text());
          }

          if (!response.ok && response.status === 422) {
            // Shopify rejects with 422 error code for Cart Errors
            return Promise.resolve(response.json()); // parses response to JSON
          }
          // add other known exceptions by not ok and status code!
          return Promise.reject(new Error(response.statusText));
        })
        .catch(error => {
          return console.error("Request failed:", error);
        });
    };
  };

  const custom = type => {
    return _f(type);
  };

  return {
    get: _f("GET"),
    set: _f("POST"),
    _c: custom
  };
})();

export default transport;
