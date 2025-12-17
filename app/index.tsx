import { Directory, File } from "expo-file-system";
import { Button, View } from "react-native";

export default function Index() {
  const downloadFile = async () => {
    try {
      const base64Data = "data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==";

      const directory = await Directory.pickDirectoryAsync();

      const file = new File(directory.uri, "test.txt");
      file.create({ overwrite: true });
      file.write(base64Data, { encoding: "base64" });

      console.log("File downloaded to:", file.uri);
    } catch (error) {
      console.error("Error downloading file:", error);
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
      <Button title="Download File" onPress={downloadFile} />
    </View>
  );
}
