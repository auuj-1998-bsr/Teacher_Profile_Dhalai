export function checkAllFields(req, res, next) {
  const data = req.body;
  const allFilled = Object.values(data).every(
    value => value !== "" && value !== null && value !== undefined
  );
  if (!allFilled) {
    return res.status(400).json({ message: "All fields required" });
  }
  next();
}
