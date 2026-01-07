import { Asset } from "expo-asset";
import { File, Paths } from "expo-file-system";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [imageLocalUri, setImageLocalUri] = useState<string | null>();
  const [computedLocalUri, setComputedLocalUri] = useState<string | null>();
  const [imageBase64, setImageBase64] = useState<string | null>();
  const [cacheListing, setCacheListing] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const getLocalAssetUri = async () => {
    try {
      const imageModule = require("../assets/images/react_logo.png");
      const [{ localUri, hash, type }] = await Asset.loadAsync(imageModule);
      setImageLocalUri(localUri);

      const cacheContents = Paths.cache.list();
      const fileNames = cacheContents
        .filter((file) => file instanceof File)
        .map((file) => file.name)
        .join(" | ");
      setCacheListing(fileNames);

      const uri = `${Paths.cache.uri}ExponentAsset-${hash}.${type}`;
      setComputedLocalUri(uri);

      const cacheFile = new File(uri);
      const base64Data = await cacheFile.base64();
      setImageBase64(base64Data);
    } catch (error) {
      console.error("Error downloading file:", error);
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Get Local Asset URI" onPress={getLocalAssetUri} />
      <View style={{ gap: 10, alignItems: "flex-start" }}>
        {imageLocalUri && <Text>Local URI: {imageLocalUri}</Text>}
        {computedLocalUri && <Text>Computed URI: {computedLocalUri}</Text>}
        {imageBase64 && <Text>Base64: {imageBase64.slice(0, 30)}...</Text>}
        {cacheListing !== undefined && (
          <Text>Cache Contents: {cacheListing}</Text>
        )}
        {errorMessage && <Text>Error: {errorMessage}</Text>}
      </View>
    </View>
  );
}
