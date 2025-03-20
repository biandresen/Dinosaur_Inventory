export function notFoundHandler(req, res) {
  res.status(404).render("404", { title: "404 - Page Not Found" });
}
