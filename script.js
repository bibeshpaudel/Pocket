const themeToggleBtn = document.getElementById("themeToggle");
const themeIcon = themeToggleBtn.querySelector("i");

// Initialize based on stored preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");

  // Toggle icon
  themeIcon.classList.toggle("fa-sun", isLight);
  themeIcon.classList.toggle("fa-moon", !isLight);

  // Save preference
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Main App Logic
document.addEventListener("DOMContentLoaded", function () {
  // Tool navigation
  const toolItems = document.querySelectorAll(".tool-item, .tool-card");
  const toolContainers = document.querySelectorAll(".tool-container");
  const currentToolTitle = document.getElementById("currentToolTitle");
  const toolbarActions = document.getElementById("toolbarActions");

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");

  // Tool navigation setup
  toolItems.forEach((item) => {
    item.addEventListener("click", function () {
      const toolId = this.getAttribute("data-tool");

      // Update active states
      toolItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      // Show selected tool container
      toolContainers.forEach((container) => {
        container.classList.remove("active");
      });

      const targetContainer = document.getElementById(toolId);
      if (targetContainer) {
        targetContainer.classList.add("active");
        currentToolTitle.textContent = this.textContent.trim();

        // Load tool-specific actions if needed
        loadToolbarActions(toolId);
      }
    });
  });

  function loadToolbarActions(toolId) {
    // Clear existing actions
    toolbarActions.innerHTML = "";

    // Add tool-specific actions here
    switch (toolId) {
      case "jsonBeautifier":
      case "xmlBeautifier":
      case "htmlBeautifier":
      case "cssBeautifier":
      case "jsBeautifier":
        addSampleDataAction(toolId);
        break;
      // Add more tool-specific actions as needed
    }
  }

  function addSampleDataAction(toolId) {
    const sampleBtn = document.createElement("button");
    sampleBtn.className = "btn btn-outline";
    sampleBtn.innerHTML = '<i class="fas fa-file-code"></i> Load Sample';
    sampleBtn.addEventListener("click", () => loadSampleData(toolId));
    toolbarActions.appendChild(sampleBtn);
  }

  function loadSampleData(toolId) {
    const sampleData = {
      jsonBeautifier:
        '{"name":"Pocket","version":"1.0","features":["Image Tools","Code Tools","Text Tools"],"active":true,"settings":{"theme":"dark","language":"en"}}',
      xmlBeautifier:
        '<root><app name="Pocket" version="1.0"><features><feature>Image Tools</feature><feature>Code Tools</feature><feature>Text Tools</feature></features><settings theme="dark" language="en"/></app></root>',
      htmlBeautifier:
        '<!DOCTYPE html><html><head><title>Pocket</title></head><body><h1>Pocket App</h1><div class="container"><p>A comprehensive toolkit for developers and designers.</p></div></body></html>',
      cssBeautifier:
        "body{font-family:sans-serif;margin:0;padding:0;background:#1e1e2e;color:#fff}.container{max-width:1200px;margin:0 auto;padding:1rem}",
      jsBeautifier:
        'function initApp(){const tools=document.querySelectorAll(".tool");tools.forEach(tool=>{tool.addEventListener("click",function(){activateTool(this.dataset.id)})});function activateTool(id){console.log("Activating tool: "+id)}}',
    };

    if (sampleData[toolId]) {
      const inputId = toolId.replace("Beautifier", "Input");
      const inputElement = document.getElementById(inputId);
      if (inputElement) {
        inputElement.value = sampleData[toolId];

        // Trigger the beautify action automatically
        const beautifyBtnId =
          "beautify" +
          toolId.charAt(0).toUpperCase() +
          toolId.slice(1).replace("Beautifier", "") +
          "Btn";
        const beautifyBtn = document.getElementById(beautifyBtnId);
        if (beautifyBtn) {
          beautifyBtn.click();
        }
      }
    }
  }

  // Copy function
  function copyToClipboard(text, button) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          button.innerHTML = originalText;
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  // Toast notification
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.zIndex = "9999";
    toast.style.margin = "10px";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "5px";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) translateY(0)";
    }, 10);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(20px)";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // Image Compressor
  const imageCompressorInput = document.getElementById("imageCompressorInput");
  const compressImageBtn = document.getElementById("compressImageBtn");
  const compressionQuality = document.getElementById("compressionQuality");
  const qualityValue = document.getElementById("qualityValue");
  const originalImage = document.getElementById("originalImage");
  const compressedImage = document.getElementById("compressedImage");
  const originalSize = document.getElementById("originalSize");
  const compressedSize = document.getElementById("compressedSize");
  const downloadCompressed = document.getElementById("downloadCompressed");

  if (imageCompressorInput && compressImageBtn) {
    compressionQuality.addEventListener("input", function () {
      qualityValue.textContent = this.value + "%";
    });

    imageCompressorInput.addEventListener("change", function (e) {
      if (this.files && this.files[0]) {
        const file = this.files[0];
        originalSize.textContent = `Original Size: ${formatFileSize(
          file.size
        )}`;

        const reader = new FileReader();
        reader.onload = function (event) {
          originalImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    compressImageBtn.addEventListener("click", function () {
      if (!imageCompressorInput.files || !imageCompressorInput.files[0]) {
        showToast("Please select an image first", "error");
        return;
      }

      const file = imageCompressorInput.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Maintain aspect ratio
          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const quality = compressionQuality.value / 100;
          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

          compressedImage.src = compressedDataUrl;

          // Calculate compressed size
          const base64str = compressedDataUrl.split(",")[1];
          const compressedBytes = atob(base64str).length;
          compressedSize.textContent = `Compressed Size: ${formatFileSize(
            compressedBytes
          )}`;

          // Enable download button
          downloadCompressed.href = compressedDataUrl;
          downloadCompressed.download = `compressed_${
            file.name.split(".")[0]
          }.jpg`;
          downloadCompressed.style.display = "inline-flex";
        };
      };
      reader.readAsDataURL(file);
    });
  }

  // Image Converter
  const imageConverterInput = document.getElementById("imageConverterInput");
  const convertImageBtn = document.getElementById("convertImageBtn");
  const convertFormat = document.getElementById("convertFormat");
  const originalConvertImage = document.getElementById("originalConvertImage");
  const convertedImage = document.getElementById("convertedImage");
  const originalConvertInfo = document.getElementById("originalConvertInfo");
  const convertedInfo = document.getElementById("convertedInfo");
  const downloadConverted = document.getElementById("downloadConverted");

  if (imageConverterInput && convertImageBtn) {
    imageConverterInput.addEventListener("change", function (e) {
      if (this.files && this.files[0]) {
        const file = this.files[0];
        originalConvertInfo.textContent = `Original: ${
          file.name
        } (${formatFileSize(file.size)})`;

        const reader = new FileReader();
        reader.onload = function (event) {
          originalConvertImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    convertImageBtn.addEventListener("click", function () {
      if (!imageConverterInput.files || !imageConverterInput.files[0]) {
        showToast("Please select an image first", "error");
        return;
      }

      const file = imageConverterInput.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const format = convertFormat.value;
          const quality = 0.92;
          const convertedDataUrl = canvas.toDataURL(format, quality);

          convertedImage.src = convertedDataUrl;

          // Get file extension from MIME type
          const extension = format.split("/")[1];

          // Calculate converted size
          const base64str = convertedDataUrl.split(",")[1];
          const convertedBytes = atob(base64str).length;
          convertedInfo.textContent = `Converted: ${
            file.name.split(".")[0]
          }.${extension} (${formatFileSize(convertedBytes)})`;

          // Enable download button
          downloadConverted.href = convertedDataUrl;
          downloadConverted.download = `${
            file.name.split(".")[0]
          }.${extension}`;
          downloadConverted.style.display = "inline-flex";
        };
      };
      reader.readAsDataURL(file);
    });
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  // JSON Beautifier
  const jsonInput = document.getElementById("jsonInput");
  const jsonOutput = document.getElementById("jsonOutput");
  const beautifyJsonBtn = document.getElementById("beautifyJsonBtn");
  const minifyJsonBtn = document.getElementById("minifyJsonBtn");
  const clearJsonBtn = document.getElementById("clearJsonBtn");
  const copyJsonBtn = document.getElementById("copyJsonBtn");

  if (jsonInput && jsonOutput) {
    beautifyJsonBtn.addEventListener("click", function () {
      try {
        const parsed = JSON.parse(jsonInput.value);
        const beautified = JSON.stringify(parsed, null, 2);
        jsonOutput.textContent = beautified;
        hljs.highlightElement(jsonOutput);
      } catch (error) {
        jsonOutput.textContent = `Error: ${error.message}`;
      }
    });

    minifyJsonBtn.addEventListener("click", function () {
      try {
        const parsed = JSON.parse(jsonInput.value);
        const minified = JSON.stringify(parsed);
        jsonOutput.textContent = minified;
        hljs.highlightElement(jsonOutput);
      } catch (error) {
        jsonOutput.textContent = `Error: ${error.message}`;
      }
    });

    clearJsonBtn.addEventListener("click", function () {
      jsonInput.value = "";
      jsonOutput.textContent = "";
    });

    copyJsonBtn.addEventListener("click", function () {
      copyToClipboard(jsonOutput.textContent, this);
    });
  }

  // XML Beautifier
  const xmlInput = document.getElementById("xmlInput");
  const xmlOutput = document.getElementById("xmlOutput");
  const beautifyXmlBtn = document.getElementById("beautifyXmlBtn");
  const minifyXmlBtn = document.getElementById("minifyXmlBtn");
  const clearXmlBtn = document.getElementById("clearXmlBtn");
  const copyXmlBtn = document.getElementById("copyXmlBtn");

  if (xmlInput && xmlOutput) {
    beautifyXmlBtn.addEventListener("click", function () {
      try {
        const beautified = html_beautify(xmlInput.value, {
          indent_size: 2,
          indent_char: " ",
          max_preserve_newlines: -1,
          preserve_newlines: false,
          indent_scripts: "normal",
        });

        xmlOutput.textContent = beautified;
        hljs.highlightElement(xmlOutput);
      } catch (error) {
        xmlOutput.textContent = `Error: ${error.message}`;
      }
    });

    minifyXmlBtn.addEventListener("click", function () {
      try {
        // Simple XML minification (remove whitespace between tags)
        const minified = xmlInput.value
          .replace(/>\s+</g, "><")
          .replace(/\s+</g, "<")
          .replace(/>\s+/g, ">")
          .trim();

        xmlOutput.textContent = minified;
        hljs.highlightElement(xmlOutput);
      } catch (error) {
        xmlOutput.textContent = `Error: ${error.message}`;
      }
    });

    clearXmlBtn.addEventListener("click", function () {
      xmlInput.value = "";
      xmlOutput.textContent = "";
    });

    copyXmlBtn.addEventListener("click", function () {
      copyToClipboard(xmlOutput.textContent, this);
    });
  }

  // HTML Beautifier
  const htmlInput = document.getElementById("htmlInput");
  const htmlOutput = document.getElementById("htmlOutput");
  const beautifyHtmlBtn = document.getElementById("beautifyHtmlBtn");
  const minifyHtmlBtn = document.getElementById("minifyHtmlBtn");
  const clearHtmlBtn = document.getElementById("clearHtmlBtn");
  const copyHtmlBtn = document.getElementById("copyHtmlBtn");

  if (htmlInput && htmlOutput) {
    beautifyHtmlBtn.addEventListener("click", function () {
      try {
        const beautified = html_beautify(htmlInput.value, {
          indent_size: 2,
          indent_char: " ",
          max_preserve_newlines: 1,
          preserve_newlines: true,
          indent_scripts: "normal",
        });

        htmlOutput.textContent = beautified;
        hljs.highlightElement(htmlOutput);
      } catch (error) {
        htmlOutput.textContent = `Error: ${error.message}`;
      }
    });

    minifyHtmlBtn.addEventListener("click", function () {
      try {
        // Simple HTML minification
        const minified = htmlInput.value
          .replace(/\s+/g, " ")
          .replace(/>\s+</g, "><")
          .replace(/\s+</g, "<")
          .replace(/>\s+/g, ">")
          .trim();

        htmlOutput.textContent = minified;
        hljs.highlightElement(htmlOutput);
      } catch (error) {
        htmlOutput.textContent = `Error: ${error.message}`;
      }
    });

    clearHtmlBtn.addEventListener("click", function () {
      htmlInput.value = "";
      htmlOutput.textContent = "";
    });

    copyHtmlBtn.addEventListener("click", function () {
      copyToClipboard(htmlOutput.textContent, this);
    });
  }

  // CSS Beautifier
  const cssInput = document.getElementById("cssInput");
  const cssOutput = document.getElementById("cssOutput");
  const beautifyCssBtn = document.getElementById("beautifyCssBtn");
  const minifyCssBtn = document.getElementById("minifyCssBtn");
  const clearCssBtn = document.getElementById("clearCssBtn");
  const copyCssBtn = document.getElementById("copyCssBtn");

  if (cssInput && cssOutput) {
    beautifyCssBtn.addEventListener("click", function () {
      try {
        const beautified = css_beautify(cssInput.value, {
          indent_size: 2,
          indent_char: " ",
        });

        cssOutput.textContent = beautified;
        hljs.highlightElement(cssOutput);
      } catch (error) {
        cssOutput.textContent = `Error: ${error.message}`;
      }
    });

    minifyCssBtn.addEventListener("click", function () {
      try {
        // Simple CSS minification
        const minified = cssInput.value
          .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
          .replace(/\s+/g, " ")
          .replace(/\s*([{}:;,])\s*/g, "$1")
          .replace(/;\}/g, "}")
          .trim();

        cssOutput.textContent = minified;
        hljs.highlightElement(cssOutput);
      } catch (error) {
        cssOutput.textContent = `Error: ${error.message}`;
      }
    });

    clearCssBtn.addEventListener("click", function () {
      cssInput.value = "";
      cssOutput.textContent = "";
    });

    copyCssBtn.addEventListener("click", function () {
      copyToClipboard(cssOutput.textContent, this);
    });
  }

  // JS Beautifier
  const jsInput = document.getElementById("jsInput");
  const jsOutput = document.getElementById("jsOutput");
  const beautifyJsBtn = document.getElementById("beautifyJsBtn");
  const minifyJsBtn = document.getElementById("minifyJsBtn");
  const clearJsBtn = document.getElementById("clearJsBtn");
  const copyJsBtn = document.getElementById("copyJsBtn");

  if (jsInput && jsOutput) {
    beautifyJsBtn.addEventListener("click", function () {
      try {
        const beautified = js_beautify(jsInput.value, {
          indent_size: 2,
          indent_char: " ",
          preserve_newlines: true,
          max_preserve_newlines: 2,
        });

        jsOutput.textContent = beautified;
        hljs.highlightElement(jsOutput);
      } catch (error) {
        jsOutput.textContent = `Error: ${error.message}`;
      }
    });

    minifyJsBtn.addEventListener("click", function () {
      try {
        // Simple JS minification (this is very basic, not a complete minifier)
        const minified = jsInput.value
          .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "") // Remove comments
          .replace(/\s+/g, " ")
          .replace(/\s*([{}:;,=+\-*/%&|^!<>])\s*/g, "$1")
          .trim();

        jsOutput.textContent = minified;
        hljs.highlightElement(jsOutput);
      } catch (error) {
        jsOutput.textContent = `Error: ${error.message}`;
      }
    });

    clearJsBtn.addEventListener("click", function () {
      jsInput.value = "";
      jsOutput.textContent = "";
    });

    copyJsBtn.addEventListener("click", function () {
      copyToClipboard(jsOutput.textContent, this);
    });
  }

  // Text Comparison
  const text1Input = document.getElementById("text1Input");
  const text2Input = document.getElementById("text2Input");
  const compareTextBtn = document.getElementById("compareTextBtn");
  const clearCompareBtn = document.getElementById("clearCompareBtn");
  const compareResult = document.getElementById("compareResult");

  if (text1Input && text2Input && compareTextBtn) {
    compareTextBtn.addEventListener("click", function () {
      const text1 = text1Input.value;
      const text2 = text2Input.value;

      if (!text1 || !text2) {
        compareResult.innerHTML =
          '<div style="color: var(--danger);">Please enter both texts to compare</div>';
        return;
      }

      // Split both texts into lines
      const lines1 = text1.split("\n");
      const lines2 = text2.split("\n");

      let result = "";
      let diffCount = 0;

      // Compare line by line
      for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
        const line1 = lines1[i] || "";
        const line2 = lines2[i] || "";

        // If both lines are identical, just add them with no highlight
        if (line1 === line2) {
          result += `<div>${line1}</div>`;
        } else {
          // Highlight removed lines (in red with a strike-through)
          if (line1) {
            result += `<div class="diff-line removed"><del>${line1}</del></div>`;
            diffCount++;
          }

          // Highlight added lines (in green)
          if (line2) {
            result += `<div class="diff-line added"><ins>${line2}</ins></div>`;
            diffCount++;
          }
        }
      }

      compareResult.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <strong>Differences found:</strong> ${diffCount}
      </div>
      <div>${result}</div>
    `;
    });

    clearCompareBtn.addEventListener("click", function () {
      text1Input.value = "";
      text2Input.value = "";
      compareResult.innerHTML = "";
    });
  }

  // Syntax Highlighter
  const codeInput = document.getElementById("codeInput");
  const codeLanguage = document.getElementById("codeLanguage");
  const highlightCodeBtn = document.getElementById("highlightCodeBtn");
  const clearCodeBtn = document.getElementById("clearCodeBtn");
  const highlightedCode = document.getElementById("highlightedCode");
  const copyCodeBtn = document.getElementById("copyCodeBtn");

  if (codeInput && highlightCodeBtn) {
    highlightCodeBtn.addEventListener("click", function () {
      const code = codeInput.value;
      const language = codeLanguage.value;

      if (!code) {
        highlightedCode.innerHTML =
          '<div style="color: var(--danger);">Please enter code to highlight</div>';
        return;
      }

      const pre = document.createElement("pre");
      const codeElement = document.createElement("code");
      codeElement.className = `language-${language}`;
      codeElement.textContent = code;
      pre.appendChild(codeElement);

      highlightedCode.innerHTML = "";
      highlightedCode.appendChild(pre);

      hljs.highlightElement(codeElement);
    });

    clearCodeBtn.addEventListener("click", function () {
      codeInput.value = "";
      highlightedCode.innerHTML = "";
    });

    copyCodeBtn.addEventListener("click", function () {
      if (highlightedCode.textContent) {
        copyToClipboard(codeInput.value, this);
      }
    });
  }

  // Base64 Tool
  const base64Input = document.getElementById("base64Input");
  const encodeBase64Btn = document.getElementById("encodeBase64Btn");
  const decodeBase64Btn = document.getElementById("decodeBase64Btn");
  const clearBase64Btn = document.getElementById("clearBase64Btn");
  const base64Output = document.getElementById("base64Output");
  const copyBase64Btn = document.getElementById("copyBase64Btn");

  if (base64Input && encodeBase64Btn) {
    encodeBase64Btn.addEventListener("click", function () {
      const input = base64Input.value;

      if (!input) {
        base64Output.textContent = "Please enter text to encode";
        return;
      }

      try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        base64Output.textContent = encoded;
      } catch (error) {
        base64Output.textContent = `Error: ${error.message}`;
      }
    });

    decodeBase64Btn.addEventListener("click", function () {
      const input = base64Input.value;

      if (!input) {
        base64Output.textContent = "Please enter base64 to decode";
        return;
      }

      try {
        const decoded = decodeURIComponent(escape(atob(input)));
        base64Output.textContent = decoded;
      } catch (error) {
        base64Output.textContent = "Error: Invalid Base64 string";
      }
    });

    clearBase64Btn.addEventListener("click", function () {
      base64Input.value = "";
      base64Output.textContent = "";
    });

    copyBase64Btn.addEventListener("click", function () {
      if (base64Output.textContent) {
        copyToClipboard(base64Output.textContent, this);
      }
    });
  }

  // URL Encode Tool
  const urlInput = document.getElementById("urlInput");
  const encodeUrlBtn = document.getElementById("encodeUrlBtn");
  const decodeUrlBtn = document.getElementById("decodeUrlBtn");
  const clearUrlBtn = document.getElementById("clearUrlBtn");
  const urlOutput = document.getElementById("urlOutput");
  const copyUrlBtn = document.getElementById("copyUrlBtn");

  if (urlInput && encodeUrlBtn) {
    encodeUrlBtn.addEventListener("click", function () {
      const input = urlInput.value;

      if (!input) {
        urlOutput.textContent = "Please enter text to encode";
        return;
      }

      try {
        const encoded = encodeURIComponent(input);
        urlOutput.textContent = encoded;
      } catch (error) {
        urlOutput.textContent = `Error: ${error.message}`;
      }
    });

    decodeUrlBtn.addEventListener("click", function () {
      const input = urlInput.value;

      if (!input) {
        urlOutput.textContent = "Please enter URL encoded text to decode";
        return;
      }

      try {
        const decoded = decodeURIComponent(input);
        urlOutput.textContent = decoded;
      } catch (error) {
        urlOutput.textContent = "Error: Invalid URL encoded string";
      }
    });

    clearUrlBtn.addEventListener("click", function () {
      urlInput.value = "";
      urlOutput.textContent = "";
    });

    copyUrlBtn.addEventListener("click", function () {
      if (urlOutput.textContent) {
        copyToClipboard(urlOutput.textContent, this);
      }
    });
  }

  // QR Code Generator
  const qrInput = document.getElementById("qrInput");
  const qrSize = document.getElementById("qrSize");
  const qrSizeValue = document.getElementById("qrSizeValue");
  const generateQRBtn = document.getElementById("generateQRBtn");
  const clearQRBtn = document.getElementById("clearQRBtn");
  const qrcodeContainer = document.getElementById("qrcode");
  const downloadQRBtn = document.getElementById("downloadQRBtn");

  if (qrInput && generateQRBtn) {
    qrSize.addEventListener("input", function () {
      qrSizeValue.textContent = this.value + " x " + this.value;
    });

    generateQRBtn.addEventListener("click", function () {
      const input = qrInput.value;

      if (!input) {
        showToast("Please enter text or URL to generate QR code", "error");
        return;
      }

      qrcodeContainer.innerHTML = "";

      const size = parseInt(qrSize.value);

      new QRCode(qrcodeContainer, {
        text: input,
        width: size,
        height: size,
        colorDark: "#ffffff",
        colorLight: "#2a2a3c",
        correctLevel: QRCode.CorrectLevel.H,
      });

      downloadQRBtn.style.display = "inline-flex";

      // Setup download button
      setTimeout(() => {
        const qrImage = qrcodeContainer.querySelector("img");
        if (qrImage) {
          downloadQRBtn.addEventListener("click", function () {
            const link = document.createElement("a");
            link.download = "qrcode.png";
            link.href = qrImage.src;
            link.click();
          });
        }
      }, 200);
    });

    clearQRBtn.addEventListener("click", function () {
      qrInput.value = "";
      qrcodeContainer.innerHTML = "";
      downloadQRBtn.style.display = "none";
    });
  }

  // Markdown Previewer
  const mdInput = document.getElementById("mdInput");
  const mdPreview = document.getElementById("mdPreview");
  const clearMdBtn = document.getElementById("clearMdBtn");
  const copyMdHtmlBtn = document.getElementById("copyMdHtmlBtn");

  if (mdInput && mdPreview) {
    mdInput.addEventListener("input", function () {
      const markdown = this.value;
      const html = marked.parse(markdown);
      mdPreview.innerHTML = html;
    });

    clearMdBtn.addEventListener("click", function () {
      mdInput.value = "";
      mdPreview.innerHTML = "";
    });

    copyMdHtmlBtn.addEventListener("click", function () {
      const markdown = mdInput.value;
      const html = marked.parse(markdown);
      copyToClipboard(html, this);
    });

    // Load sample markdown
    mdInput.value = `# Markdown Example

                        ## Formatting

                        **Bold text** and *italic text*

                        ## Lists

                        * Item 1
                        * Item 2
                        * Nested item
                        
                        1. First item
                        2. Second item

                        ## Code

                        \`\`\`javascript
                        function sayHello() {
                        console.log("Hello, world!");
                        }
                        \`\`\`

                        ## Links

                        [Visit Pocket](https://example.com)

                        ## Blockquotes

                        > This is a blockquote
                        > It can span multiple lines

                        ---

                        ## Tables

                        | Header 1 | Header 2 |
                        |----------|----------|
                        | Cell 1   | Cell 2   |
                        | Cell 3   | Cell 4   |
                        `;
    // Trigger input event to render the markdown
    mdInput.dispatchEvent(new Event("input"));
  }

  // UUID Generator
  const uuidVersion = document.getElementById("uuidVersion");
  const generateUuidBtn = document.getElementById("generateUuidBtn");
  const uppercaseUuid = document.getElementById("uppercaseUuid");
  const noDashesUuid = document.getElementById("noDashesUuid");
  const uuidOutput = document.getElementById("uuidOutput");
  const copyUuidBtn = document.getElementById("copyUuidBtn");
  const bulkUuidBtn = document.getElementById("bulkUuidBtn");
  const bulkUuidGroup = document.getElementById("bulkUuidGroup");
  const uuidCount = document.getElementById("uuidCount");
  const bulkUuidResult = document.getElementById("bulkUuidResult");
  const copyBulkUuidBtn = document.getElementById("copyBulkUuidBtn");

  // Generate a Version 4 (random) UUID
  function generateUUIDv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // Generate a Version 1 (time-based) UUID
  function generateUUIDv1() {
    // This is a simplified implementation of v1 UUID
    let d = new Date().getTime();
    let d2 = (performance && performance.now && performance.now() * 1000) || 0;
    return "xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        let r = Math.random() * 16;
        if (d > 0) {
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  // Format UUID based on user preferences
  function formatUUID(uuid) {
    let formattedUUID = uuid;

    if (noDashesUuid.checked) {
      formattedUUID = formattedUUID.replace(/-/g, "");
    }

    if (uppercaseUuid.checked) {
      formattedUUID = formattedUUID.toUpperCase();
    }

    return formattedUUID;
  }

  // Generate a single UUID
  function generateUUID() {
    const version = uuidVersion.value;
    let uuid;

    if (version === "v4") {
      uuid = generateUUIDv4();
    } else if (version === "v1") {
      uuid = generateUUIDv1();
    }

    const formattedUUID = formatUUID(uuid);
    uuidOutput.value = formattedUUID;
  }

  // Copy UUID to clipboard
  function copyUUID() {
    // Using the existing copyToClipboard utility
    copyToClipboard(uuidOutput.value, copyUuidBtn);
    showToast("UUID copied to clipboard", "success");
  }

  // Generate multiple UUIDs
  function generateBulkUUID() {
    const count = parseInt(uuidCount.value);
    const version = uuidVersion.value;

    if (isNaN(count) || count < 1 || count > 100) {
      showToast("Please enter a valid number between 1 and 100", "error");
      return;
    }

    bulkUuidResult.innerHTML = "";
    const uuids = [];

    for (let i = 0; i < count; i++) {
      let uuid;
      if (version === "v4") {
        uuid = generateUUIDv4();
      } else if (version === "v1") {
        uuid = generateUUIDv1();
      }

      const formattedUUID = formatUUID(uuid);
      uuids.push(formattedUUID);

      const uuidElement = document.createElement("div");
      uuidElement.textContent = `${i + 1}. ${formattedUUID}`;
      uuidElement.style.marginBottom = "0.5rem";
      uuidElement.style.fontFamily = "monospace";
      bulkUuidResult.appendChild(uuidElement);
    }

    // Store in data attribute for copying
    bulkUuidResult.dataset.uuids = uuids.join("\n");
  }

  // Copy bulk UUIDs to clipboard
  function copyBulkUUID() {
    const uuids = bulkUuidResult.dataset.uuids;

    // Using the existing copyToClipboard utility
    copyToClipboard(uuids, copyBulkUuidBtn);
    showToast(`${uuidCount.value} UUIDs copied to clipboard`, "success");
  }

  // Toggle bulk UUID generation panel
  function toggleBulkUUIDPanel() {
    if (
      bulkUuidGroup.style.display === "none" ||
      !bulkUuidGroup.style.display
    ) {
      bulkUuidGroup.style.display = "block";
      generateBulkUUID();
    } else {
      bulkUuidGroup.style.display = "none";
    }
  }

  // Add event listeners
  generateUuidBtn.addEventListener("click", generateUUID);
  copyUuidBtn.addEventListener("click", copyUUID);
  bulkUuidBtn.addEventListener("click", toggleBulkUUIDPanel);
  copyBulkUuidBtn.addEventListener("click", copyBulkUUID);

  // Update UUID when preferences change
  uppercaseUuid.addEventListener("change", generateUUID);
  noDashesUuid.addEventListener("change", generateUUID);
  uuidVersion.addEventListener("change", generateUUID);
  uuidCount.addEventListener("change", function () {
    if (bulkUuidGroup.style.display !== "none") {
      generateBulkUUID();
    }
  });

  // Password Generator
  const passwordLength = document.getElementById("passwordLength");
  const passwordLengthValue = document.getElementById("passwordLengthValue");
  const includeUppercase = document.getElementById("includeUppercase");
  const includeLowercase = document.getElementById("includeLowercase");
  const includeNumbers = document.getElementById("includeNumbers");
  const includeSymbols = document.getElementById("includeSymbols");
  const excludeSimilar = document.getElementById("excludeSimilar");
  const generatePasswordBtn = document.getElementById("generatePasswordBtn");
  const passwordOutput = document.getElementById("passwordOutput");
  const togglePasswordBtn = document.getElementById("togglePasswordBtn");
  const passwordStrength = document.getElementById("passwordStrength");
  const passwordStrengthText = document.getElementById("passwordStrengthText");
  const copyPasswordBtn = document.getElementById("copyPasswordBtn");

  // Character sets
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  const similarChars = /[ilIL1|oO0]/g;

  // Update the password length display as the slider moves
  passwordLength.addEventListener("input", function () {
    passwordLengthValue.textContent = `${this.value} characters`;
  });

  // Generate password based on selected options
  function generatePassword() {
    let charset = "";
    let password = "";

    // Check if at least one character set is selected
    if (
      !includeUppercase.checked &&
      !includeLowercase.checked &&
      !includeNumbers.checked &&
      !includeSymbols.checked
    ) {
      showToast("Please select at least one character type", "error");
      return;
    }

    // Build the character set
    if (includeUppercase.checked) charset += uppercaseChars;
    if (includeLowercase.checked) charset += lowercaseChars;
    if (includeNumbers.checked) charset += numberChars;
    if (includeSymbols.checked) charset += symbolChars;

    // Remove similar characters if option is checked
    if (excludeSimilar.checked) {
      charset = charset.replace(similarChars, "");
    }

    // Generate the password
    const length = passwordLength.value;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    // Update the password output
    passwordOutput.value = password;

    // Evaluate and display password strength
    evaluatePasswordStrength(password);
  }

  // Evaluate password strength
  function evaluatePasswordStrength(password) {
    let strength = 0;
    const length = password.length;

    // Length contribution (up to 40%)
    if (length >= 8) strength += 10;
    if (length >= 12) strength += 10;
    if (length >= 16) strength += 10;
    if (length >= 20) strength += 10;

    // Character variety contribution (up to 60%)
    if (/[A-Z]/.test(password)) strength += 15; // Uppercase
    if (/[a-z]/.test(password)) strength += 15; // Lowercase
    if (/[0-9]/.test(password)) strength += 15; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 15; // Symbols

    // Update strength indicator
    passwordStrength.style.width = `${strength}%`;

    if (strength < 40) {
      passwordStrength.className = "password-strength";
      passwordStrengthText.textContent = "Weak";
      passwordStrengthText.style.color = "var(--danger)";
    } else if (strength < 70) {
      passwordStrength.className = "password-strength medium";
      passwordStrengthText.textContent = "Medium";
      passwordStrengthText.style.color = "var(--warning)";
    } else {
      passwordStrength.className = "password-strength strong";
      passwordStrengthText.textContent = "Strong";
      passwordStrengthText.style.color = "var(--success)";
    }
  }

  // Toggle password visibility
  function togglePasswordVisibility() {
    if (passwordOutput.type === "password") {
      passwordOutput.type = "text";
      togglePasswordBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
      passwordOutput.type = "password";
      togglePasswordBtn.innerHTML = '<i class="fas fa-eye"></i>';
    }
  }

  // Copy password to clipboard
  function copyPassword() {
    if (!passwordOutput.value) {
      showToast("Generate a password first", "error");
      return;
    }

    copyToClipboard(passwordOutput.value, copyPasswordBtn);
    showToast("Password copied to clipboard", "success");
  }

  // Set initial password output type
  passwordOutput.type = "password";

  // Add event listeners
  generatePasswordBtn.addEventListener("click", generatePassword);
  togglePasswordBtn.addEventListener("click", togglePasswordVisibility);
  copyPasswordBtn.addEventListener("click", copyPassword);

  // Update password when options change
  const optionInputs = [
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    excludeSimilar,
    passwordLength,
  ];

  optionInputs.forEach((input) => {
    input.addEventListener("change", generatePassword);
  });

  // Text Case Converter
  const caseInput = document.getElementById("caseInput");
  const caseOutput = document.getElementById("caseOutput");
  const upperCaseBtn = document.getElementById("upperCaseBtn");
  const lowerCaseBtn = document.getElementById("lowerCaseBtn");
  const titleCaseBtn = document.getElementById("titleCaseBtn");
  const sentenceCaseBtn = document.getElementById("sentenceCaseBtn");
  const camelCaseBtn = document.getElementById("camelCaseBtn");
  const pascalCaseBtn = document.getElementById("pascalCaseBtn");
  const snakeCaseBtn = document.getElementById("snakeCaseBtn");
  const kebabCaseBtn = document.getElementById("kebabCaseBtn");
  const toggleCaseBtn = document.getElementById("toggleCaseBtn");
  const copyCaseBtn = document.getElementById("copyCaseBtn");
  const clearCaseBtn = document.getElementById("clearCaseBtn");

  // Convert to uppercase
  function toUpperCase() {
    if (!caseInput.value.trim()) {
      showToast("Please enter some text first", "warning");
      return;
    }
    caseOutput.value = caseInput.value.toUpperCase();
  }

  // Convert to lowercase
  function toLowerCase() {
    if (!caseInput.value.trim()) {
      showToast("Please enter some text first", "warning");
      return;
    }
    caseOutput.value = caseInput.value.toLowerCase();
  }

  // Convert to title case
  function toTitleCase() {
    if (!caseInput.value.trim()) {
      showToast("Please enter some text first", "warning");
      return;
    }

    caseOutput.value = caseInput.value
      .toLowerCase()
      .split(" ")
      .map((word) => {
        if (word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      })
      .join(" ");
  }

  // Convert to sentence case
  function toSentenceCase() {
    if (!caseInput.value.trim()) {
      showToast("Please enter some text first", "warning");
      return;
    }

    // Split by sentence ending punctuation and process each sentence
    const sentences = caseInput.value.split(/([.!?]+)/);
    let result = "";

    for (let i = 0; i < sentences.length; i++) {
      if (i % 2 === 0) {
        // Content part
        const trimmed = sentences[i].trim();
        if (trimmed) {
          // Make the first character uppercase and the rest lowercase
          result +=
            trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
        } else {
          result += sentences[i];
        }
      } else {
        // Punctuation part
        result += sentences[i];
      }
    }

    caseOutput.value = result;
  }

  // Convert to camel case
  function toCamelCase() {
    if (!caseInput.value.trim()) {
      showToast("Please enter some text first", "warning");
      return;
    }

    // First convert to lowercase and remove special characters
    const words = caseInput.value
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word); // Remove empty strings

    // First word is lowercase, capitalize the rest
    if (words.length > 0) {
      const result =
        words[0] +
        words
          .slice(1)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("");

      caseOutput.value = result;
    } else {
      caseOutput.value = "";
    }
  }

  // Convert to pascal case
  function toPascalCase() {
    if (!caseInput.value.trim()) {
      showToast("Please enter some text first", "warning");
      return;
    }

    // Convert to lowercase and remove special characters
    const words = caseInput.value
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word); // Remove empty strings

    // Capitalize all words
    const result = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

    caseOutput.value = result;
  }

  // Convert to snake case
  function toSnakeCase() {
    if (!caseInput.value.trim()) {
      showToast("Please enter some text first", "warning");
      return;
    }

    // Convert to lowercase, replace special characters and spaces with underscore
    const result = caseInput.value
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .trim()
      .replace(/\s+/g, "_");

    caseOutput.value = result;
  }

  // Convert to kebab case
  function toKebabCase() {
    if (!caseInput.value.trim()) {
      showToast("Please enter some text first", "warning");
      return;
    }

    // Convert to lowercase, replace special characters and spaces with hyphen
    const result = caseInput.value
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .trim()
      .replace(/\s+/g, "-");

    caseOutput.value = result;
  }

  // Toggle case of each character
  function toggleCase() {
    if (!caseInput.value.trim()) {
      showToast("Please enter some text first", "warning");
      return;
    }

    const result = caseInput.value
      .split("")
      .map((char) => {
        if (char === char.toUpperCase()) {
          return char.toLowerCase();
        } else {
          return char.toUpperCase();
        }
      })
      .join("");

    caseOutput.value = result;
  }

  // Copy converted text to clipboard
  function copyConvertedText() {
    if (!caseOutput.value) {
      showToast("Nothing to copy", "warning");
      return;
    }

    copyToClipboard(caseOutput.value, copyCaseBtn);
    showToast("Text copied to clipboard", "success");
  }

  // Clear both input and output
  function clearText() {
    caseInput.value = "";
    caseOutput.value = "";
    caseInput.focus();
  }

  upperCaseBtn.addEventListener("click", toUpperCase);
  lowerCaseBtn.addEventListener("click", toLowerCase);
  titleCaseBtn.addEventListener("click", toTitleCase);
  sentenceCaseBtn.addEventListener("click", toSentenceCase);
  camelCaseBtn.addEventListener("click", toCamelCase);
  pascalCaseBtn.addEventListener("click", toPascalCase);
  snakeCaseBtn.addEventListener("click", toSnakeCase);
  kebabCaseBtn.addEventListener("click", toKebabCase);
  toggleCaseBtn.addEventListener("click", toggleCase);
  copyCaseBtn.addEventListener("click", copyConvertedText);
  clearCaseBtn.addEventListener("click", clearText);

  // Auto-convert when input changes (optional)
  caseInput.addEventListener("input", function () {
    // If there's already a conversion type applied, reapply it on input change
    if (caseOutput.value) {
      // Find which button was last clicked - simple approach
      const activeButtons = [
        { btn: upperCaseBtn, func: toUpperCase },
        { btn: lowerCaseBtn, func: toLowerCase },
        { btn: titleCaseBtn, func: toTitleCase },
        { btn: sentenceCaseBtn, func: toSentenceCase },
        { btn: camelCaseBtn, func: toCamelCase },
        { btn: pascalCaseBtn, func: toPascalCase },
        { btn: snakeCaseBtn, func: toSnakeCase },
        { btn: kebabCaseBtn, func: toKebabCase },
        { btn: toggleCaseBtn, func: toggleCase },
      ];

      // Look for the button with active class, or default to lowercase
      const activeButton = activeButtons.find((item) =>
        item.btn.classList.contains("active")
      ) || { func: toLowerCase };

      // Apply the transformation
      activeButton.func();
    }
  });

  // Helper function to set active button
  function setActiveButton(button) {
    const buttons = [
      upperCaseBtn,
      lowerCaseBtn,
      titleCaseBtn,
      sentenceCaseBtn,
      camelCaseBtn,
      pascalCaseBtn,
      snakeCaseBtn,
      kebabCaseBtn,
      toggleCaseBtn,
    ];

    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
  }

  // Add active class to buttons when clicked
  const conversionButtons = [
    upperCaseBtn,
    lowerCaseBtn,
    titleCaseBtn,
    sentenceCaseBtn,
    camelCaseBtn,
    pascalCaseBtn,
    snakeCaseBtn,
    kebabCaseBtn,
    toggleCaseBtn,
  ];

  conversionButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      setActiveButton(this);
    });
  });

  // Word Count Tool
  const countInput = document.getElementById("countInput");
  const analyzeTextBtn = document.getElementById("analyzeTextBtn");
  const clearCountBtn = document.getElementById("clearCountBtn");

  if (countInput && analyzeTextBtn && clearCountBtn) {
    analyzeTextBtn.addEventListener("click", function () {
      const text = countInput.value;
      analyzeText(text);
    });

    clearCountBtn.addEventListener("click", function () {
      countInput.value = "";
      resetCounters();
    });

    // Only analyze when typing if the word count tool is active
    countInput.addEventListener("input", function () {
      const activeTool = document.querySelector(".tool-container.active");
      if (activeTool && activeTool.id === "wordCount") {
        const text = this.value;
        if (text.trim().length > 0) {
          analyzeText(text);
        } else {
          resetCounters();
        }
      }
    });
  }

  function analyzeText(text) {
    // Character count (including spaces)
    const charCount = text.length;
    // Character count (excluding spaces)
    const charCountNoSpaces = text.replace(/\s+/g, "").length;

    // Word count (split by whitespace and filter out empty strings)
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    const wordCount = words.length;

    // Sentence count (split by .!? followed by space or end of string)
    const sentences = text
      .split(/[.!?]+(?=\s|$)/)
      .filter((s) => s.trim().length > 0);
    const sentenceCount = sentences.length;

    // Paragraph count (split by empty lines)
    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
    const paragraphCount = paragraphs.length;

    // Line count
    const lines = text.split("\n").filter((l) => l.trim().length > 0);
    const lineCount = lines.length;

    // Reading time (average reading speed: 200 words per minute)
    const readingTimeMinutes = Math.ceil(wordCount / 200);
    const readingTime =
      readingTimeMinutes <= 1
        ? "Less than 1 min"
        : `${readingTimeMinutes} mins`;

    // Update the UI
    document.getElementById("characterCount").textContent = charCount;
    document.getElementById("wordCountValue").textContent = wordCount;
    document.getElementById("sentenceCount").textContent = sentenceCount;
    document.getElementById("paragraphCount").textContent = paragraphCount;
    document.getElementById("lineCount").textContent = lineCount;
    document.getElementById("readingTime").textContent = readingTime;

    // Calculate common words
    if (wordCount > 0) {
      const commonWords = calculateCommonWords(words);
      displayCommonWords(commonWords);
    } else {
      document.getElementById("commonWords").innerHTML =
        '<p class="text-muted">No words to analyze</p>';
    }
  }

  function resetCounters() {
    document.getElementById("characterCount").textContent = "0";
    document.getElementById("wordCountValue").textContent = "0";
    document.getElementById("sentenceCount").textContent = "0";
    document.getElementById("paragraphCount").textContent = "0";
    document.getElementById("lineCount").textContent = "0";
    document.getElementById("readingTime").textContent = "0";
    document.getElementById("commonWords").innerHTML = "";
  }

  function calculateCommonWords(words) {
    const wordFrequency = {};

    words.forEach((word) => {
      // Normalize word (lowercase, remove punctuation)
      const normalizedWord = word
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

      if (normalizedWord.length > 0) {
        wordFrequency[normalizedWord] =
          (wordFrequency[normalizedWord] || 0) + 1;
      }
    });

    // Convert to array and sort by frequency
    const sortedWords = Object.keys(wordFrequency)
      .map((word) => ({
        word: word,
        count: wordFrequency[word],
      }))
      .sort((a, b) => b.count - a.count);

    return sortedWords.slice(0, 20); // Return top 20 words
  }

  function displayCommonWords(commonWords) {
    const commonWordsContainer = document.getElementById("commonWords");

    if (commonWords.length === 0) {
      commonWordsContainer.innerHTML =
        '<p class="text-muted">No common words found</p>';
      return;
    }

    let html =
      '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.5rem;">';

    commonWords.forEach((item) => {
      const percentage = Math.round((item.count / commonWords[0].count) * 100);
      const opacity = 0.3 + (percentage / 100) * 0.7; // Range from 0.3 to 1.0

      html += `
            <div style="background-color: rgba(99, 102, 241, ${opacity}); 
                        padding: 0.5rem; 
                        border-radius: 4px; 
                        font-size: 0.875rem;">
                <span style="font-weight: 500;">${item.word}</span>
                <span style="float: right;">${item.count}</span>
            </div>
        `;
    });

    html += "</div>";
    commonWordsContainer.innerHTML = html;
  }

  // Timestamp Converter Tool
  const currentTimestampEl = document.getElementById("currentTimestamp");
  const currentDateTimeEl = document.getElementById("currentDateTime");
  const copyCurrentTimestampBtn = document.getElementById(
    "copyCurrentTimestampBtn"
  );
  const copyCurrentDateBtn = document.getElementById("copyCurrentDateBtn");
  const timestampInput = document.getElementById("timestampInput");
  const convertTimestampBtn = document.getElementById("convertTimestampBtn");
  const timestampResult = document.getElementById("timestampResult");
  const dateInput = document.getElementById("dateInput");
  const convertDateBtn = document.getElementById("convertDateBtn");
  const dateResult = document.getElementById("dateResult");

  // Update current timestamp and date time
  function updateCurrentTime() {
    const now = new Date();

    // Current timestamp (seconds)
    const unixTimestamp = Math.floor(now.getTime() / 1000);
    currentTimestampEl.value = unixTimestamp;

    // Current date time (formatted)
    currentDateTimeEl.value = formatDateTime(now);
  }

  // Format date to readable string
  function formatDateTime(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return date.toLocaleDateString("en-US", options);
  }

  // Convert timestamp to date
  function convertTimestamp() {
    const timestamp = timestampInput.value.trim();

    if (!timestamp) {
      timestampResult.innerHTML =
        '<p class="text-muted">Please enter a timestamp</p>';
      return;
    }

    try {
      // Check if timestamp is in seconds or milliseconds
      let date;
      if (timestamp.length <= 10) {
        // Unix timestamp (seconds)
        date = new Date(parseInt(timestamp) * 1000);
      } else {
        // JavaScript timestamp (milliseconds)
        date = new Date(parseInt(timestamp));
      }

      if (isNaN(date.getTime())) {
        throw new Error("Invalid timestamp");
      }

      const formattedDate = formatDateTime(date);
      const utcString = date.toUTCString();
      const isoString = date.toISOString();

      timestampResult.innerHTML = `
                <div><strong>Local Time:</strong> ${formattedDate}</div>
                <div><strong>UTC:</strong> ${utcString}</div>
                <div><strong>ISO 8601:</strong> ${isoString}</div>
                <div><strong>Milliseconds:</strong> ${date.getTime()}</div>
                <div><strong>Seconds:</strong> ${Math.floor(
                  date.getTime() / 1000
                )}</div>
            `;
    } catch (e) {
      timestampResult.innerHTML =
        '<p style="color: var(--danger)">Invalid timestamp format</p>';
    }
  }

  // Convert date to timestamp
  function convertDate() {
    const dateString = dateInput.value;

    if (!dateString) {
      dateResult.innerHTML = '<p class="text-muted">Please select a date</p>';
      return;
    }

    try {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }

      const seconds = Math.floor(date.getTime() / 1000);
      const milliseconds = date.getTime();

      dateResult.innerHTML = `
                <div><strong>Unix Timestamp (seconds):</strong> ${seconds}</div>
                <div><strong>JavaScript Timestamp (ms):</strong> ${milliseconds}</div>
                <div><strong>ISO 8601:</strong> ${date.toISOString()}</div>
            `;
    } catch (e) {
      dateResult.innerHTML =
        '<p style="color: var(--danger)">Invalid date format</p>';
    }
  }

  // Copy to clipboard functions
  copyCurrentTimestampBtn.addEventListener("click", function () {
    copyToClipboard(currentTimestampEl.value, this);
  });

  copyCurrentDateBtn.addEventListener("click", function () {
    copyToClipboard(currentDateTimeEl.value, this);
  });

  // Event listeners
  convertTimestampBtn.addEventListener("click", convertTimestamp);
  convertDateBtn.addEventListener("click", convertDate);

  // Allow Enter key to trigger conversion
  timestampInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      convertTimestamp();
    }
  });

  // Initialize with current time
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  // Set default datetime-local input to now
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localISOTime = new Date(now - timezoneOffset)
    .toISOString()
    .slice(0, 16);
  dateInput.value = localISOTime;

  // Helper function to copy to clipboard
  function copyToClipboard(text, button) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          button.innerHTML = originalText;
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  //Regex Tester Tool
  const regexInput = document.getElementById("regexInput");
  const regexTestString = document.getElementById("regexTestString");
  const testRegexBtn = document.getElementById("testRegexBtn");
  const regexResult = document.getElementById("regexResult");
  const regexMatches = document.getElementById("regexMatches");
  const regexHighlighted = document.getElementById("regexHighlighted");
  const regexGlobal = document.getElementById("regexGlobal");
  const regexCase = document.getElementById("regexCase");
  const regexMultiline = document.getElementById("regexMultiline");

  // Test regular expression
  function testRegex() {
    const pattern = regexInput.value.trim();
    const testString = regexTestString.value;

    // Clear previous results
    regexResult.innerHTML = "";
    regexMatches.innerHTML = "";
    regexHighlighted.innerHTML = "";

    if (!pattern) {
      regexResult.innerHTML =
        '<p class="text-muted">Please enter a regular expression</p>';
      return;
    }

    if (!testString) {
      regexResult.innerHTML =
        '<p class="text-muted">Please enter a test string</p>';
      return;
    }

    try {
      // Build flags string
      let flags = "";
      if (regexGlobal.checked) flags += "g";
      if (regexCase.checked) flags += "i";
      if (regexMultiline.checked) flags += "m";

      const regex = new RegExp(pattern, flags);
      const matches = testString.match(regex);

      // Display test results
      if (matches === null) {
        regexResult.innerHTML = `
                    <div class="regex-test-result match-not-found">
                        <i class="fas fa-times-circle"></i> No matches found
                    </div>
                `;
      } else {
        regexResult.innerHTML = `
                    <div class="regex-test-result match-found">
                        <i class="fas fa-check-circle"></i> ${
                          matches.length
                        } match${matches.length !== 1 ? "es" : ""} found
                    </div>
                `;
      }

      // Display matches details
      if (matches) {
        let matchesHtml =
          '<div style="display: grid; grid-template-columns: auto 1fr; gap: 0.5rem;">';
        matches.forEach((match, index) => {
          matchesHtml += `
                        <div style="font-weight: 500;">Match ${index + 1}:</div>
                        <div>${escapeHtml(match)}</div>
                        <div>Index:</div>
                        <div>${testString.indexOf(match)}</div>
                        <div>Length:</div>
                        <div>${match.length}</div>
                        <div style="grid-column: 1 / -1; height: 1px; background: var(--border-dark); margin: 0.25rem 0;"></div>
                    `;
        });
        matchesHtml += "</div>";
        regexMatches.innerHTML = matchesHtml;
      } else {
        regexMatches.innerHTML =
          '<p class="text-muted">No matches to display</p>';
      }

      // Display highlighted text
      if (testString) {
        if (matches) {
          let highlightedText = testString;
          const replacement = '<span class="matches-highlight">$&</span>';

          // Create a new regex without global flag for replacement
          const highlightRegex = new RegExp(
            regex.source,
            flags.replace("g", "")
          );

          // Replace all matches (using split/join for global replacement)
          if (regexGlobal.checked) {
            const parts = highlightedText.split(regex);
            const matches = highlightedText.match(regex) || [];
            highlightedText = parts.reduce((acc, part, i) => {
              return (
                acc +
                part +
                (i < matches.length
                  ? replacement.replace("$&", matches[i])
                  : "")
              );
            }, "");
          } else {
            highlightedText = highlightedText.replace(
              highlightRegex,
              replacement
            );
          }

          regexHighlighted.innerHTML = highlightedText;
        } else {
          regexHighlighted.textContent = testString;
        }
      }

      // Display regex details
      const regexDetails = `
                <div style="margin-top: 1rem;">
                    <div><strong>Pattern:</strong> /${escapeHtml(
                      pattern
                    )}/${flags}</div>
                    <div><strong>Source:</strong> ${escapeHtml(
                      regex.source
                    )}</div>
                </div>
            `;
      regexResult.innerHTML += regexDetails;
    } catch (e) {
      regexResult.innerHTML = `
                <div class="regex-test-result match-not-found">
                    <i class="fas fa-exclamation-triangle"></i> Invalid regular expression: ${escapeHtml(
                      e.message
                    )}
                </div>
            `;
    }
  }

  // Helper function to escape HTML
  function escapeHtml(unsafe) {
    return unsafe
      .toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Event listeners
  testRegexBtn.addEventListener("click", testRegex);

  // Also test when Enter is pressed in either input
  regexInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      testRegex();
    }
  });

  regexTestString.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      testRegex();
    }
  });

  // Test regex when flags are changed
  [regexGlobal, regexCase, regexMultiline].forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (regexInput.value && regexTestString.value) {
        testRegex();
      }
    });
  });

  // Network Tools
  const clientIpEl = document.getElementById("clientIp");
  const ipLocationEl = document.getElementById("ipLocation");
  const ipLookupInput = document.getElementById("ipLookupInput");
  const ipLookupBtn = document.getElementById("ipLookupBtn");
  const ipLookupResult = document.getElementById("ipLookupResult");
  const dnsInput = document.getElementById("dnsInput");
  const dnsLookupBtn = document.getElementById("dnsLookupBtn");
  const dnsResult = document.getElementById("dnsResult");

  // Get client IP and location
  function getClientIp() {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        clientIpEl.value = data.ip;
        getIpLocation(data.ip);
      })
      .catch((error) => {
        clientIpEl.value = "Unable to determine";
        console.error("Error fetching IP:", error);
      });
  }

  // Get IP location information
  function getIpLocation(ip) {
    fetch(`https://ipapi.co/${ip}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          const location = `${data.city}, ${data.region}, ${data.country_name}`;
          ipLocationEl.value = location;
        } else {
          ipLocationEl.value = "Location unavailable";
        }
      })
      .catch((error) => {
        ipLocationEl.value = "Location service error";
        console.error("Error fetching location:", error);
      });
  }

  // IP Lookup function
  function lookupIp() {
    const query = ipLookupInput.value.trim();
    if (!query) {
      ipLookupResult.innerHTML =
        '<p class="text-muted">Please enter an IP or domain</p>';
      return;
    }

    ipLookupResult.innerHTML =
      '<div class="loading"><div class="loader"></div> Looking up...</div>';

    // Determine if input is IP or domain
    const isIp = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(query);

    if (isIp) {
      // IP address lookup
      fetch(`https://ipapi.co/${query}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            ipLookupResult.innerHTML = `<p style="color: var(--danger)">${
              data.reason || "Invalid IP address"
            }</p>`;
            return;
          }

          let resultHtml = `
                        <div><strong>IP:</strong> ${data.ip || "N/A"}</div>
                        <div><strong>Location:</strong> ${
                          data.city || "N/A"
                        }, ${data.region || "N/A"}, ${
            data.country_name || "N/A"
          }</div>
                        <div><strong>ISP:</strong> ${data.org || "N/A"}</div>
                        <div><strong>Postal Code:</strong> ${
                          data.postal || "N/A"
                        }</div>
                        <div><strong>Timezone:</strong> ${
                          data.timezone || "N/A"
                        }</div>
                        <div><strong>Coordinates:</strong> ${
                          data.latitude || "N/A"
                        }, ${data.longitude || "N/A"}</div>
                    `;
          ipLookupResult.innerHTML = resultHtml;
        })
        .catch((error) => {
          ipLookupResult.innerHTML = `<p style="color: var(--danger)">Error fetching IP information</p>`;
          console.error("IP lookup error:", error);
        });
    } else {
      // Domain to IP lookup
      fetch(
        `https://dns.google/resolve?name=${encodeURIComponent(query)}&type=A`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.Answer && data.Answer.length > 0) {
            const ips = data.Answer.map((answer) => answer.data).join(", ");
            ipLookupResult.innerHTML = `
                            <div><strong>Domain:</strong> ${query}</div>
                            <div><strong>IP Addresses:</strong> ${ips}</div>
                        `;
          } else {
            ipLookupResult.innerHTML = `<p style="color: var(--danger)">No IP addresses found for this domain</p>`;
          }
        })
        .catch((error) => {
          ipLookupResult.innerHTML = `<p style="color: var(--danger)">Error resolving domain</p>`;
          console.error("Domain lookup error:", error);
        });
    }
  }

  // DNS Lookup function
  function dnsLookup() {
    const domain = dnsInput.value.trim();
    if (!domain) {
      dnsResult.innerHTML = '<p class="text-muted">Please enter a domain</p>';
      return;
    }

    dnsResult.innerHTML =
      '<div class="loading"><div class="loader"></div> Querying DNS...</div>';

    // Using Google's public DNS API
    Promise.all([
      fetch(
        `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`
      ),
      fetch(
        `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`
      ),
      fetch(
        `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=TXT`
      ),
      fetch(
        `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=NS`
      ),
    ])
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((data) => {
        let resultHtml = `<div><strong>Domain:</strong> ${domain}</div>`;

        // A Records
        if (data[0].Answer && data[0].Answer.length > 0) {
          resultHtml += `<div><strong>A Records:</strong> ${data[0].Answer.map(
            (a) => a.data
          ).join(", ")}</div>`;
        }

        // MX Records
        if (data[1].Answer && data[1].Answer.length > 0) {
          resultHtml += `<div><strong>MX Records:</strong> ${data[1].Answer.map(
            (mx) =>
              `${mx.data.split(" ")[1]} (priority ${mx.data.split(" ")[0]})`
          ).join(", ")}</div>`;
        }

        // TXT Records
        if (data[2].Answer && data[2].Answer.length > 0) {
          resultHtml += `<div><strong>TXT Records:</strong> ${data[2].Answer.map(
            (txt) => txt.data.replace(/"/g, "")
          ).join(", ")}</div>`;
        }

        // NS Records
        if (data[3].Answer && data[3].Answer.length > 0) {
          resultHtml += `<div><strong>NS Records:</strong> ${data[3].Answer.map(
            (ns) => ns.data
          ).join(", ")}</div>`;
        }

        if (resultHtml === `<div><strong>Domain:</strong> ${domain}</div>`) {
          resultHtml += `<div>No DNS records found</div>`;
        }

        dnsResult.innerHTML = resultHtml;
      })
      .catch((error) => {
        dnsResult.innerHTML = `<p style="color: var(--danger)">Error performing DNS lookup</p>`;
        console.error("DNS lookup error:", error);
      });
  }

  // Event listeners
  ipLookupBtn.addEventListener("click", lookupIp);
  ipLookupInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") lookupIp();
  });

  dnsLookupBtn.addEventListener("click", dnsLookup);
  dnsInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") dnsLookup();
  });

  // Initialize
  getClientIp();

  // Color Picker Tool
  const colorPreview = document.getElementById("colorPreview");
  const colorInput = document.getElementById("colorInput");
  const colorPickerInput = document.getElementById("colorPickerInput");
  const applyColorBtn = document.getElementById("applyColorBtn");
  const randomColorBtn = document.getElementById("randomColorBtn");
  const hexOutput = document.getElementById("hexOutput");
  const rgbOutput = document.getElementById("rgbOutput");
  const hslOutput = document.getElementById("hslOutput");
  const nameOutput = document.getElementById("nameOutput");
  const saturationSlider = document.getElementById("saturationSlider");

  // Color database (extended)
  const colorNames = {
    "#ff0000": "Red",
    "#00ff00": "Green",
    "#0000ff": "Blue",
    "#ffffff": "White",
    "#000000": "Black",
    "#ffa500": "Orange",
    "#ffff00": "Yellow",
    "#800080": "Purple",
    "#ffc0cb": "Pink",
    "#a52a2a": "Brown",
    "#008000": "Green (Web)",
    "#808000": "Olive",
    "#ff00ff": "Magenta",
    "#00ffff": "Cyan",
    "#808080": "Gray",
    "#c0c0c0": "Silver",
    "#ffd700": "Gold",
    "#d2b48c": "Tan",
    "#ff6347": "Tomato",
    "#4682b4": "Steel Blue",
    "#add8e6": "Light Blue",
    "#f0e68c": "Khaki",
    "#ff1493": "Deep Pink",
    "#32cd32": "Lime Green",
    "#dc143c": "Crimson",
    "#ff4500": "Orange Red",
    "#8a2be2": "Blue Violet",
    "#4b0082": "Indigo",
    "#7fff00": "Chartreuse",
    "#d2691e": "Chocolate",
    "#cd5c5c": "Indian Red",
    "#9acd32": "Yellow Green",
    "#b22222": "Firebrick",
    "#ffb6c1": "Light Pink",
    "#a9a9a9": "Dark Gray",
    "#f4a300": "Saffron",
    "#2f4f4f": "Dark Slate Gray",
    "#5f9ea0": "Cadet Blue",
    "#f5fffa": "Mint Cream",
    "#faebd7": "Antique White",
    "#ffdead": "Navajo White",
    "#7cfc00": "Lawn Green",
    "#800000": "Maroon",
    "#c71585": "Medium Violet Red",
    "#b8860b": "Dark Goldenrod",
    "#ff8c00": "Dark Orange",
    "#6495ed": "Cornflower Blue",
    "#fff8dc": "Cornsilk",
    "#e6e6fa": "Lavender",
    "#fff0f5": "Lavender Blush",
    "#dcdcdc": "Gainsboro",
    "#f0f8ff": "Alice Blue",
    "#8b0000": "Dark Red",
    "#2e8b57": "Sea Green",
    "#4169e1": "Royal Blue",
    "#ffb300": "Vivid Yellow",
    "#008b8b": "Dark Cyan",
    "#a0522d": "Sienna",
    "#6a5acd": "Slate Blue",
    "#fffacd": "Lemon Chiffon",
    "#fffae6": "Eggshell",
  };

  // Current color state
  let currentColor = "#6366f1"; // Default color (matches your theme)
  let baseColor = { r: 99, g: 102, b: 241 }; // Store base RGB values

  // Initialize the color picker
  function initColorPicker() {
    updateColorPreview(currentColor);
    updateColorValues(currentColor);
    colorPickerInput.value = currentColor;
    colorInput.value = currentColor;

    // Set initial saturation slider value (100% by default)
    const hsl = rgbToHsl(baseColor.r, baseColor.g, baseColor.b);
    saturationSlider.value = hsl.s;
  }

  // Convert any color input to hex
  function parseColorInput(color) {
    // If it's a color name, try to convert to hex
    if (colorNames[color.toLowerCase()]) {
      return colorNames[color.toLowerCase()];
    }

    // Check for hex format
    if (/^#([0-9a-f]{3}){1,2}$/i.test(color)) {
      return color.length === 4
        ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
        : color;
    }

    // Check for rgb format
    const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);
      return rgbToHex(r, g, b);
    }

    // Check for hsl format
    const hslMatch = color.match(/^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/i);
    if (hslMatch) {
      const h = parseInt(hslMatch[1]);
      const s = parseInt(hslMatch[2]);
      const l = parseInt(hslMatch[3]);
      const rgb = hslToRgb(h, s, l);
      return rgbToHex(rgb.r, rgb.g, rgb.b);
    }

    // Fallback to browser's color parsing
    const tempDiv = document.createElement("div");
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);
    const computedColor = window.getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);

    const computedRgbMatch = computedColor.match(
      /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i
    );
    if (computedRgbMatch) {
      const r = parseInt(computedRgbMatch[1]);
      const g = parseInt(computedRgbMatch[2]);
      const b = parseInt(computedRgbMatch[3]);
      return rgbToHex(r, g, b);
    }

    return null; // Invalid color
  }

  // Update the color preview box
  function updateColorPreview(color) {
    colorPreview.style.backgroundColor = color;
  }

  // Update all color value outputs
  function updateColorValues(color) {
    try {
      const hex = parseColorInput(color);
      if (!hex) {
        throw new Error("Invalid color format");
      }

      // HEX
      hexOutput.value = hex.toUpperCase();

      // RGB
      const rgb = hexToRgb(hex);
      rgbOutput.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

      // HSL
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      hslOutput.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

      // Color name
      nameOutput.value = colorNames[hex.toLowerCase()] || "Custom Color";

      // Update the native color picker
      colorPickerInput.value = hex;
      colorInput.value = hex;

      // Update current color and base color
      currentColor = hex;
      baseColor = rgb;
    } catch (e) {
      console.error("Invalid color format:", color);
      hexOutput.value = "Invalid";
      rgbOutput.value = "Invalid";
      hslOutput.value = "Invalid";
      nameOutput.value = "Invalid";
    }
  }

  // Color conversion functions
  function hexToRgb(hex) {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    const bigint = parseInt(hex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }

  function rgbToHex(r, g, b) {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  }

  function rgbToHsl(r, g, b) {
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  }

  // Apply color from input
  function applyColor() {
    const color = colorInput.value.trim();
    if (color) {
      updateColorValues(color);
      updateColorPreview(currentColor);
    }
  }

  // Generate random color
  function generateRandomColor() {
    const randomHex =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    colorInput.value = randomHex;
    applyColor();
  }

  // Adjust color with saturation slider
  function adjustSaturation() {
    const saturationAdjustment = parseInt(saturationSlider.value);

    // Get base HSL values
    const baseHsl = rgbToHsl(baseColor.r, baseColor.g, baseColor.b);

    // Calculate adjusted saturation
    const s = Math.min(100, Math.max(0, saturationAdjustment));

    // Convert back to RGB and HEX
    const adjustedRgb = hslToRgb(baseHsl.h, s, baseHsl.l);
    const adjustedHex = rgbToHex(adjustedRgb.r, adjustedRgb.g, adjustedRgb.b);

    // Update UI
    updateColorPreview(adjustedHex);
    hexOutput.value = adjustedHex.toUpperCase();
    rgbOutput.value = `rgb(${adjustedRgb.r}, ${adjustedRgb.g}, ${adjustedRgb.b})`;
    hslOutput.value = `hsl(${baseHsl.h}, ${s}%, ${baseHsl.l}%)`;
    nameOutput.value = colorNames[adjustedHex.toLowerCase()] || "Custom Color";
    colorInput.value = adjustedHex;
    colorPickerInput.value = adjustedHex;
  }

  // Event listeners
  applyColorBtn.addEventListener("click", applyColor);
  randomColorBtn.addEventListener("click", generateRandomColor);
  colorPickerInput.addEventListener("input", function () {
    colorInput.value = this.value;
    applyColor();
  });

  // Saturation slider adjustment
  saturationSlider.addEventListener("input", adjustSaturation);

  // Also apply color when Enter is pressed
  colorInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      applyColor();
    }
  });

  // Initialize
  initColorPicker();

  document
    .getElementById("generateLoremBtn")
    .addEventListener("click", function () {
      debugger;
      const paragraphCount = parseInt(
        document.getElementById("loremParagraphCount").value
      );
      const sentencesPerParagraph = parseInt(
        document.getElementById("sentencesPerParagraph").value
      );
      const wordsPerSentence = parseInt(
        document.getElementById("wordsPerSentence").value
      );

      const loremWords = [
        "lorem",
        "ipsum",
        "dolor",
        "sit",
        "amet",
        "consectetur",
        "adipiscing",
        "elit",
        "sed",
        "do",
        "eiusmod",
        "tempor",
        "incididunt",
        "ut",
        "labore",
        "et",
        "dolore",
        "magna",
        "aliqua",
        "ut",
        "enim",
        "ad",
        "minim",
        "veniam",
        "quis",
        "nostrud",
        "exercitation",
        "ullamco",
        "laboris",
        "nisi",
        "ut",
        "aliquip",
        "ex",
        "ea",
        "commodo",
        "consequat",
        "duis",
        "aute",
        "irure",
        "dolor",
        "in",
        "reprehenderit",
        "in",
        "voluptate",
        "velit",
        "esse",
        "cillum",
        "dolore",
        "eu",
        "fugiat",
        "nulla",
        "pariatur",
        "excepteur",
        "sint",
        "occaecat",
        "cupidatat",
        "non",
        "proident",
        "sunt",
        "in",
        "culpa",
        "qui",
        "officia",
        "deserunt",
        "mollit",
        "anim",
        "id",
        "est",
        "laborum",
      ];

      let result = "";

      for (let p = 0; p < paragraphCount; p++) {
        let paragraph = "";

        for (let s = 0; s < sentencesPerParagraph; s++) {
          let sentence = "";
          const sentenceLength =
            wordsPerSentence + Math.floor(Math.random() * 5) - 2;

          for (let w = 0; w < sentenceLength; w++) {
            const randomWord =
              loremWords[Math.floor(Math.random() * loremWords.length)];
            sentence +=
              w === 0
                ? randomWord.charAt(0).toUpperCase() + randomWord.slice(1)
                : " " + randomWord;
          }

          sentence += ".";
          paragraph += s === 0 ? sentence : " " + sentence;
        }

        result += `<p>${paragraph}</p>`;
      }

      document.getElementById("loremResult").innerHTML = result;
    });

  document
    .getElementById("copyLoremBtn")
    .addEventListener("click", function () {
      const text = document.getElementById("loremResult").innerText;
      copyToClipboard(text, this);
    });

  // Timezone Converter
  function populateTimezones() {
    const timezones = [
      "UTC",
      "America/New_York",
      "America/Chicago",
      "America/Denver",
      "America/Los_Angeles",
      "Europe/London",
      "Europe/Paris",
      "Europe/Berlin",
      "Asia/Tokyo",
      "Asia/Shanghai",
      "Australia/Sydney",
      "Pacific/Auckland",
    ];

    const fromSelect = document.getElementById("fromTimezone");
    const toSelect = document.getElementById("toTimezone");

    timezones.forEach((tz) => {
      const option1 = document.createElement("option");
      option1.value = tz;
      option1.textContent = tz;
      fromSelect.appendChild(option1);

      const option2 = document.createElement("option");
      option2.value = tz;
      option2.textContent = tz;
      toSelect.appendChild(option2);
    });

    // Set default to UTC
    toSelect.value = "UTC";
  }

  function updateCurrentTime() {
    const now = new Date();
    document.getElementById("currentTime").value = now.toLocaleString();
    document.getElementById("localTimezone").value =
      Intl.DateTimeFormat().resolvedOptions().timeZone;

    const formatted = now.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM'
    document.getElementById("fromDateTime").value = formatted;

    // Update world clocks
    updateWorldClocks();
  }

  function updateWorldClocks() {
    const timezones = [
      { name: "New York", tz: "America/New_York" },
      { name: "London", tz: "Europe/London" },
      { name: "Tokyo", tz: "Asia/Tokyo" },
      { name: "Sydney", tz: "Australia/Sydney" },
    ];

    let clocksHtml = "";

    timezones.forEach((zone) => {
      const time = new Date().toLocaleString("en-US", { timeZone: zone.tz });
      clocksHtml += `<div><strong>${zone.name}:</strong> ${time}</div>`;
    });

    document.getElementById("worldClocks").innerHTML = clocksHtml;
  }

  document
    .getElementById("convertTimezoneBtn")
    .addEventListener("click", function () {
      const fromTz = document.getElementById("fromTimezone").value;
      const toTz = document.getElementById("toTimezone").value;
      const dateTime = document.getElementById("fromDateTime").value;

      try {
        let date;
        if (fromTz === "local") {
          date = new Date(dateTime);
        } else {
          const dateStr = new Date(dateTime).toLocaleString("en-US", {
            timeZone: fromTz,
          });
          date = new Date(dateStr);
        }

        const convertedTime = date.toLocaleString("en-US", { timeZone: toTz });
        document.getElementById("convertedTime").value = convertedTime;
      } catch (e) {
        document.getElementById("convertedTime").value = "Conversion error";
      }
    });

  // Initialize timezone converter
  populateTimezones();
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  // Unit Converter
  const unitConversions = {
    length: {
      meters: 1,
      kilometers: 1000,
      centimeters: 0.01,
      millimeters: 0.001,
      inches: 0.0254,
      feet: 0.3048,
      yards: 0.9144,
      miles: 1609.34,
    },
    weight: {
      grams: 1,
      kilograms: 1000,
      milligrams: 0.001,
      pounds: 453.592,
      ounces: 28.3495,
      tons: 907185,
    },
    volume: {
      liters: 1,
      milliliters: 0.001,
      gallons: 3.78541,
      quarts: 0.946353,
      pints: 0.473176,
      cups: 0.24,
      tablespoons: 0.0147868,
      teaspoons: 0.00492892,
    },
    temperature: {
      celsius: {
        convert: (v, to) =>
          to === "fahrenheit"
            ? (v * 9) / 5 + 32
            : to === "kelvin"
            ? v + 273.15
            : v,
      },
      fahrenheit: {
        convert: (v, to) =>
          to === "celsius"
            ? ((v - 32) * 5) / 9
            : to === "kelvin"
            ? ((v - 32) * 5) / 9 + 273.15
            : v,
      },
      kelvin: {
        convert: (v, to) =>
          to === "celsius"
            ? v - 273.15
            : to === "fahrenheit"
            ? ((v - 273.15) * 9) / 5 + 32
            : v,
      },
    },
    currency: {
      usd: 1,
      eur: 0.85,
      gbp: 0.73,
      jpy: 110.25,
      aud: 1.3,
      cad: 1.21,
      cny: 6.45,
      inr: 74.85,
    },
    data: {
      bytes: 1,
      kilobytes: 1024,
      megabytes: 1048576,
      gigabytes: 1073741824,
      terabytes: 1099511627776,
    },
  };

  function populateUnitSelects() {
    const typeSelect = document.getElementById("conversionType");
    const fromSelect = document.getElementById("fromUnit");
    const toSelect = document.getElementById("toUnit");

    typeSelect.addEventListener("change", function () {
      const type = this.value;
      const units = Object.keys(unitConversions[type]);

      // Clear existing options
      fromSelect.innerHTML = "";
      toSelect.innerHTML = "";

      // Add new options
      units.forEach((unit) => {
        const option1 = document.createElement("option");
        option1.value = unit;
        option1.textContent = unit;
        fromSelect.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = unit;
        option2.textContent = unit;
        toSelect.appendChild(option2);
      });

      // Set different default to unit
      if (units.length > 1) {
        toSelect.selectedIndex = 1;
      }

      // Update common conversions
      updateCommonConversions(type, units[0]);
    });

    // Trigger initial population
    typeSelect.dispatchEvent(new Event("change"));
  }

  function updateCommonConversions(type, fromUnit) {
    const units = Object.keys(unitConversions[type]);
    let commonHtml = "";

    if (type === "temperature") {
      commonHtml = `
        <div><strong>0°C:</strong> 32°F, 273.15K</div>
        <div><strong>100°C:</strong> 212°F, 373.15K</div>
        <div><strong>-40°C:</strong> -40°F, 233.15K</div>
      `;
    } else {
      // Show conversions for 1, 10, 100 units
      [1, 10, 100].forEach((value) => {
        const conversions = units
          .filter((u) => u !== fromUnit)
          .map((unit) => {
            const converted = convertUnit(value, fromUnit, unit, type);
            return `${converted} ${unit}`;
          })
          .join(", ");

        commonHtml += `<div><strong>${value} ${fromUnit}:</strong> ${conversions}</div>`;
      });
    }

    document.getElementById("commonConversions").innerHTML = commonHtml;
  }

  function convertUnit(value, fromUnit, toUnit, type) {
    if (type === "temperature") {
      return unitConversions.temperature[fromUnit]
        .convert(parseFloat(value), toUnit)
        .toFixed(2);
    }

    const fromFactor = unitConversions[type][fromUnit];
    const toFactor = unitConversions[type][toUnit];
    const baseValue = parseFloat(value) * fromFactor;
    return (baseValue / toFactor).toFixed(6).replace(/\.?0+$/, "");
  }

  document
    .getElementById("convertUnitBtn")
    .addEventListener("click", function () {
      const type = document.getElementById("conversionType").value;
      const fromUnit = document.getElementById("fromUnit").value;
      const toUnit = document.getElementById("toUnit").value;
      const value = document.getElementById("fromValue").value;

      if (!value) {
        document.getElementById("convertedValue").value = "Enter a value";
        return;
      }

      const result = convertUnit(value, fromUnit, toUnit, type);
      document.getElementById("convertedValue").value = result;
    });

  document.getElementById("fromUnit").addEventListener("change", function () {
    const type = document.getElementById("conversionType").value;
    const fromUnit = this.value;
    updateCommonConversions(type, fromUnit);
  });

  // Initialize unit converter
  populateUnitSelects();

  // Hash Generator
  document
    .getElementById("generateHashBtn")
    .addEventListener("click", function () {
      const text = document.getElementById("hashInput").value;
      const algorithm = document.getElementById("hashAlgorithm").value;

      if (!text) {
        document.getElementById("hashResult").value = "Enter text to hash";
        return;
      }

      let hash;
      switch (algorithm) {
        case "md5":
          hash = CryptoJS.MD5(text).toString();
          break;
        case "sha1":
          hash = CryptoJS.SHA1(text).toString();
          break;
        case "sha256":
          hash = CryptoJS.SHA256(text).toString();
          break;
        case "sha512":
          hash = CryptoJS.SHA512(text).toString();
          break;
        case "ripemd160":
          hash = CryptoJS.RIPEMD160(text).toString();
          break;
        default:
          hash = "Unsupported algorithm";
      }

      document.getElementById("hashResult").value = hash;
    });

  document
    .getElementById("clearHashBtn")
    .addEventListener("click", function () {
      document.getElementById("hashInput").value = "";
      document.getElementById("hashResult").value = "";
    });

  document.getElementById("copyHashBtn").addEventListener("click", function () {
    const text = document.getElementById("hashResult").value;
    copyToClipboard(text, this);
  });

  // AES Encrypt/Decrypt
  document.getElementById("encryptBtn").addEventListener("click", function () {
    const text = document.getElementById("aesInput").value;
    const key = document.getElementById("aesKey").value;

    if (!text || !key) {
      document.getElementById("aesResult").value = "Enter both text and key";
      return;
    }

    try {
      const encrypted = CryptoJS.AES.encrypt(text, key).toString();
      document.getElementById("aesResult").value = encrypted;
      document.getElementById("aesOperation").value = "Encrypted";
    } catch (e) {
      document.getElementById("aesResult").value = "Encryption failed";
    }
  });

  document.getElementById("decryptBtn").addEventListener("click", function () {
    const text = document.getElementById("aesInput").value;
    const key = document.getElementById("aesKey").value;

    if (!text || !key) {
      document.getElementById("aesResult").value = "Enter both text and key";
      return;
    }

    try {
      const decrypted = CryptoJS.AES.decrypt(text, key).toString(
        CryptoJS.enc.Utf8
      );
      document.getElementById("aesResult").value =
        decrypted || "Decryption failed (wrong key?)";
      document.getElementById("aesOperation").value = decrypted
        ? "Decrypted"
        : "Decryption failed";
    } catch (e) {
      document.getElementById("aesResult").value = "Decryption failed";
    }
  });

  document.getElementById("clearAesBtn").addEventListener("click", function () {
    document.getElementById("aesInput").value = "";
    document.getElementById("aesKey").value = "";
    document.getElementById("aesResult").value = "";
    document.getElementById("aesOperation").value = "";
  });

  document.getElementById("copyAesBtn").addEventListener("click", function () {
    const text = document.getElementById("aesResult").value;
    copyToClipboard(text, this);
  });
});
