const Post = require('../model/Post');


const handleNewPost = async (req, res) => {
    const { createdAt, product, createdby, screenshot, severity,status, summary, title, type, lifecycle} = req.body;

    try {
        //create and store the new user
        const result = await Post.create({
            "title": title,
            "type": type,
            "createdby": createdby,
            "severity": severity,
            "product": product,
            "screenshot": screenshot,
            "summary": summary,
            "createdAt": createdAt,
            "status": status,
            "lifecycle": lifecycle,

        });
        res.status(201).json({ 'success': `New post created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getAllPosts = async (req, res) => {
    const users = await Post.find({ lifecycle: "active" });
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const getClosedPosts = async (req, res) => {
    const users = await Post.find({ lifecycle: "complete" });
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const getSinglePosts = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await Post.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

const finishPost = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const post = await Post.findOne({ _id: req.params.id }).exec();
    if (!post) {
        return res.status(204).json({ 'message': `Post ID ${req.params.id} not found` });
    }
    if (req.body?.lifecycle) post.lifecycle = req.body.lifecycle;
    const result = await post.save();
    res.json(result);

}
const reOpenPost = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const post = await Post.findOne({ _id: req.params.id }).exec();
    if (!post) {
        return res.status(204).json({ 'message': `Post ID ${req.params.id} not found` });
    }
    if (req.body?.lifecycle) post.lifecycle = req.body.lifecycle;
    const result = await post.save();
    res.json(result);

}




module.exports = { handleNewPost , getAllPosts, getSinglePosts , finishPost, getClosedPosts,reOpenPost };