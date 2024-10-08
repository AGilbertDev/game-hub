import noImage from "../assets/no-image-placeholder.webp";

const getCroppedImageUrl = (url: string) => {
	if (!url) return noImage;
	const target = "media/";
	const index = url.indexOf(target) + target.length; // Finds index right after "media/" in the url.
	return url.slice(0, index) + "crop/600/400/" + url.slice(index); // Returns the url with the crop query inserted.
};
export default getCroppedImageUrl;
