import { useEffect, useState } from "react";

const useImage = (nft: any) => {
  const [nftImageUrl, setNftImageUrl] = useState<string>("");

  const getImage = async () => {
    let filteredUrl = nft?.ipfs?.split("//").pop();
    if (filteredUrl) {
      const imageFromUrl = await fetch(`https://ipfs.io/ipfs/${filteredUrl}`)
        .then((response) => response.json())
        .then((data) => {
          return data.image.split("//").pop();
        });
      setNftImageUrl(imageFromUrl);
    }
  };

  useEffect(() => {
    getImage();
  }, [nft]);

  return nftImageUrl;
};

export default useImage;
