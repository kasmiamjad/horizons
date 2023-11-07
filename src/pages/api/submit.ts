
export default async function handler(req, res) {
  const body =req.body;
  console.log('Hassan');

  console.log(body);

  res.status(200).json({ user:'success' });
}