import { v2 as cloudinary } from 'cloudinary'
import albumModel from '../models/albumModel.js'
import { json } from 'express';

const addAlbum = async (req, res) => {

    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColor = req.body.bgColor;
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });


        const albumData = {
            name,
            desc,
            bgColor,
            image:imageUpload.secure_url
        }

        const album = albumModel(albumData);
        await album.save();

        res.json({success:true, message:"Album added"});

    } catch (error) {

        res.json({success:false, message:"Album  not added"});

    }

}

const listAlbum = async (req, res) => {

    try {

        const allAlbums= await albumModel.find({});
        res.json({success:true,albums:allAlbums});

    } catch (error) {

        res.json({success:false});

    }

}

const removeAlbum = async (req, res) => {

    try {

        await albumModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message:"Album removed"})

    } catch (error) {

            res.json({ success: false})

    }

}

export { addAlbum, listAlbum, removeAlbum }