import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

export default function HomeScreen() {
    const webviewRef = useRef<WebView>(null);
    const [html, setHtml] = useState<string | null>(null);

    useEffect(() => {
        // Pannellum official panorama
        const bedroomUri = "https://raw.githubusercontent.com/Aakash12312/panorama-images/main/bedroom.jpg";
        const livingroomUri = "https://raw.githubusercontent.com/Aakash12312/panorama-images/main/livingroom.jpg";
        const kitchenUri = "https://raw.githubusercontent.com/Aakash12312/panorama-images/main/kitchen.jpg";

        const arrowIconBase64 =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAvUlEQVQ4T2NkoBAwUqifgXkYCYICZgYGBgQxE3eJzLQAqF2C0CTzFw5gFh0GJCEiAakQk3IQhDyBiIeoClBlQ5hiATkRzDFBOoAGQZZkGsXoHxLQBzKICqgCh5GqACkCVGBZgZGBgYHzpAlEmJkZGR8TsEBpAkZi+BYZCCOYhZgYGJgYmNhWkMwPBQyoHUVYiKkA2SnYI2ZGAfIRsQJfEEcBK2gAow0p0DJRrIYAAAAASUVORK5CYII=";

        const htmlString = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>360° Panorama Viewer</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum/build/pannellum.css" />
  <script src="https://cdn.jsdelivr.net/npm/pannellum/build/pannellum.js"></script>
  <style>
    html, body, #panorama { margin: 0; padding: 0; height: 100%; width: 100%; background: #000; }
    .pnlm-hotspot-base { cursor: pointer; }
    .hotspot-img { width: 50px; height: 50px; }
  </style>
</head>
<body>
  <div id="panorama"></div>
  <script>
    const arrowIcon = "${arrowIconBase64}";

    function postMessage(obj) {
      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        window.ReactNativeWebView.postMessage(JSON.stringify(obj));
      }
    }

    var viewer = pannellum.viewer('panorama', {
      default: { firstScene: 'bedroom', sceneFadeDuration: 1000 },
      autoLoad: true,
      showControls: true,
      scenes: {
        bedroom: {
          type: 'equirectangular',
          panorama: "${bedroomUri}",
          hotSpots: [
            { pitch: 0, yaw: 90, type: 'scene', text: 'Go to Living Room', sceneId: 'livingroom',
              createTooltipFunc: function(hotSpotDiv) { const img = document.createElement('img'); img.src=arrowIcon; img.className='hotspot-img'; hotSpotDiv.appendChild(img); }
            },
            { pitch: 0, yaw: -90, type: 'scene', text: 'Go to Kitchen', sceneId: 'kitchen',
              createTooltipFunc: function(hotSpotDiv) { const img = document.createElement('img'); img.src=arrowIcon; img.className='hotspot-img'; hotSpotDiv.appendChild(img); }
            }
          ]
        },
        livingroom: {
          type: 'equirectangular',
          panorama: "${livingroomUri}",
          hotSpots: [
            { pitch: 0, yaw: -90, type: 'scene', text: 'Go to Bedroom', sceneId: 'bedroom',
              createTooltipFunc: function(hotSpotDiv) { const img = document.createElement('img'); img.src=arrowIcon; img.className='hotspot-img'; hotSpotDiv.appendChild(img); }
            }
          ]
        },
        kitchen: {
          type: 'equirectangular',
          panorama: "${kitchenUri}",
          hotSpots: [
            { pitch: 0, yaw: 0, type: 'scene', text: 'Go to Bedroom', sceneId: 'bedroom',
              createTooltipFunc: function(hotSpotDiv) { const img = document.createElement('img'); img.src=arrowIcon; img.className='hotspot-img'; hotSpotDiv.appendChild(img); }
            }
          ]
        }
      }
    });

    viewer.on('scenechange', function() { postMessage({ type:'sceneChange', scene: viewer.getScene() }); });
    postMessage({ type:'ready' });
  </script>
</body>
</html>
`;

        setHtml(htmlString);
    }, []);

    const onMessage = (event: WebViewMessageEvent) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === "sceneChange") console.log("Scene changed to:", data.scene);
            else if (data.type === "ready") console.log("Pannellum ready inside WebView");
        } catch (e) {
            console.warn("Could not parse message from WebView:", e);
        }
    };

    if (!html) {
        return (
            <SafeAreaView style={styles.center}>
                <Text style={{ color: "#fff" }}>Loading panorama...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <WebView
                originWhitelist={["*"]}
                source={{ html }}
                ref={webviewRef}
                style={styles.webview}
                onMessage={onMessage}
                javaScriptEnabled
                domStorageEnabled
                allowsInlineMediaPlayback
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000" },
    webview: { flex: 1, backgroundColor: "#000" },
    center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
});
