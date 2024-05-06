import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [nfts, setNFTs] = useState([]);

    useEffect(() => {
        async function fetchNFTs() {
            // Assuming your CID is stored in a variable called `nftCID`
            const nftCID = "QmVnLwSKBgHqwrSbVhqxxnyiupHH2TTe3EEUeP2k8YLKu5";

            // Fetch metadata from IPFS using CID
            const metadataResponse = await axios.get(`https://ipfs.io/ipfs/${nftCID}`);
            const metadata = metadataResponse.data;

            // Extract image URI from metadata
            const imageURI = metadata.image;

            // Add the NFT data to the state
            setNFTs([{ name: metadata.name, description: metadata.description, imageURI }]);
        }
        fetchNFTs();
    }, []);

    return (
        <div>
            <h1>My NFTs</h1>
            <div>
                {nfts.map((nft, index) => (
                    <div key={index}>
                        <img src={nft.imageURI} alt={`NFT ${index}`} />
                        <p>{nft.name}</p>
                        <p>{nft.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
