export default function handler(req, res) {
  if (req.method === 'POST') {
    const { title, artist, content } = req.body;
    console.log('受け取ったデータ:', title, artist, content);

    res.status(200).json({ message: '受け取りました' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
