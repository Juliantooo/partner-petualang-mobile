import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, } from "../firebase/firebase";

export const uploadAvatarProfile = async (uri: string, id: string) => {
    const fileName = `profile-${id}.jpg`
    const avatar = await fetch(uri);
    const avatarBytes = await avatar.blob();

    const storageRef = ref(storage, fileName);
    const metadata = {
        contentType: 'image/jpeg',
    };

    const response = await uploadBytes(storageRef, avatarBytes, metadata).then((snapshot) => {
        return getDownloadURL(snapshot.ref)
    }).then((imageUrl) => {
        return imageUrl
    })

    return response
}