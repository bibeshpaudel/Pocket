// Ensure Prism autoloader knows where to find languages
Prism.plugins.autoloader.languages_path =
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/";

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const mobileSidebarToggle = document.getElementById("mobile-sidebar-toggle");
  const toolSearch = document.getElementById("tool-search");
  const toolSearchIconBtn = document.getElementById("tool-search-icon-btn");
  const toolButtons = document.querySelectorAll("[data-tool]");
  const toolContents = document.querySelectorAll(".tool-content");
  const mainContentArea = document.querySelector("main");

  if (window.innerWidth < 768 && !sidebar.classList.contains("collapsed")) {
    sidebar.classList.add("collapsed");
    updateSidebarToggleIcon(true);
  } else if (
    window.innerWidth >= 768 &&
    sidebar.classList.contains("collapsed")
  ) {
    updateSidebarToggleIcon(sidebar.classList.contains("collapsed"));
  } else {
    updateSidebarToggleIcon(sidebar.classList.contains("collapsed"));
  }

  function updateSidebarToggleIcon(isCollapsed) {
    sidebarToggle.querySelector("svg").innerHTML = isCollapsed
      ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>' // Hamburger
      : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>'; // Chevron Left
  }

  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    updateSidebarToggleIcon(sidebar.classList.contains("collapsed"));
  });

  toolSearchIconBtn.addEventListener("click", () => {
    if (sidebar.classList.contains("collapsed")) {
      sidebar.classList.remove("collapsed");
      updateSidebarToggleIcon(false);
    }
    toolSearch.focus();
  });

  toolSearch.addEventListener("focus", () => {
    if (sidebar.classList.contains("collapsed")) {
      sidebar.classList.remove("collapsed");
      updateSidebarToggleIcon(false);
    }
  });

  mobileSidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  function setActiveTool(toolId) {
    toolContents.forEach((content) => content.classList.remove("active"));
    const activeContent = document.getElementById(`${toolId}-content`);
    if (activeContent) {
      activeContent.classList.add("active");
    } else {
      document.getElementById("dashboard-content").classList.add("active");
    }
    window.location.hash = toolId;
    if (mainContentArea) {
      mainContentArea.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
    toolButtons.forEach((btn) => {
      const isCurrentTool = btn.getAttribute("data-tool") === toolId;
      btn.classList.toggle(
        "bg-gray-100",
        isCurrentTool && !html.classList.contains("dark")
      );
      btn.classList.toggle(
        "dark:bg-gray-700",
        isCurrentTool && html.classList.contains("dark")
      );
      if (!isCurrentTool) {
        btn.classList.remove("bg-gray-100", "dark:bg-gray-700");
      }
    });
  }

  toolButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const toolId = button.getAttribute("data-tool");
      setActiveTool(toolId);
      if (window.innerWidth < 768 && !sidebar.classList.contains("collapsed")) {
        sidebar.classList.add("collapsed");
        updateSidebarToggleIcon(true);
      }
    });
  });

  toolSearch.addEventListener("input", () => {
    const searchTerm = toolSearch.value.toLowerCase();
    document.querySelectorAll("#sidebar nav > div").forEach((categoryDiv) => {
      let categoryHasVisibleItem = false;
      categoryDiv.querySelectorAll("ul li").forEach((li) => {
        const button = li.querySelector("button[data-tool]");
        const toolName =
          button
            ?.querySelector(".sidebar-item-text")
            ?.textContent.toLowerCase() || "";
        const isVisible = toolName.includes(searchTerm);
        li.style.display = isVisible ? "block" : "none";
        if (isVisible) categoryHasVisibleItem = true;
      });
      const header = categoryDiv.querySelector("h3");
      if (header) {
        header.style.display =
          categoryHasVisibleItem || searchTerm === "" ? "flex" : "none";
      }
    });
  });

  const html = document.documentElement;
  const savedTheme = "dark";
  html.classList.add(savedTheme);

  function generateDashboardContent() {
    const dashboardContentEl = document.getElementById("dashboard-content");
    const pinnedTools = [
      {
        id: "base64-converter",
        name: "Base64 Encoder/Decoder",
        desc: "Encode and decode Base64 strings.",
        icon: `<svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 mr-2 text-blue-500"
                        viewBox="0 0 100 100"
                        fill="currentColor">
                        <text
                        x="50"
                        y="60"
                        font-family="Arial, Helvetica, sans-serif"
                        font-size="50"
                        font-weight="bold"
                        text-anchor="middle">
                        B64
                        </text>
                        </svg>
                        `,
      },
      {
        id: "url-converter",
        name: "URL Encoder/Decoder",
        desc: "Encode and decode URL components.",
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>',
      },
      {
        id: "json-beautifier",
        name: "JSON Formatter",
        desc: "Beautify, minify, and view JSON data.",
        icon: `<svg
                         xmlns="http://www.w3.org/2000/svg"
                         class="h-5 w-5 mr-2 text-blue-500"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor"
                       >
                         <path
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="2"
                           d="M6 9v6m-2 0a2 2 0 002 2h.5M6 9H4a2 2 0 012-2h.5M18 15v-6m2 0a2 2 0 00-2-2h-.5m2 8a2 2 0 01-2 2h-.5"
                         />
                       </svg>`,
      },
      {
        id: "xml-beautifier",
        name: "XML Formatter",
        desc: "Format and view XML data.",
        icon: `<svg
                         xmlns="http://www.w3.org/2000/svg"
                         class="h-5 w-5 mr-2 text-blue-500"
                         viewBox="0 0 512 512"
                         fill="currentColor">
                         <g transform="translate(62.077867, 42.666667)">
                           <path d="M257.922133,7.10542736e-15 L23.2554667,7.10542736e-15 L23.2554667,234.666667 L65.9221333,234.666667 L65.9221333,192 L65.9221333,169.6 L65.9221333,42.6666667 L240.215467,42.6666667 L321.922133,124.373333 L321.922133,169.6 L321.922133,192 L321.922133,234.666667 L364.5888,234.666667 L364.5888,106.666667 L257.922133,7.10542736e-15 L257.922133,7.10542736e-15 Z M95.936,277.568 L65.728,319.338667 L35.904,277.568 L2.34666667,277.568 L47.3813333,339.946667 L-2.13162821e-14,405.696 L34.0693333,405.696 L64.2986667,362.922667 L94.6773333,405.696 L129.472,405.696 L82.3893333,340.672 L128.938667,277.568 L95.936,277.568 Z M231.0848,346.606933 C228.9088,353.284267 226.4128,361.924267 223.575467,372.462933 C220.759467,361.796267 218.263467,353.1776 216.1728,346.606933 L194.0288,277.3376 L151.255467,277.3376 L151.255467,405.4656 L177.922133,405.4656 L177.922133,301.742933 C180.866133,312.7936 183.447467,321.646933 185.602133,328.3456 L210.562133,405.4656 L235.330133,405.4656 L261.015467,326.1696 C263.6608,318.084267 266.0288,309.956267 268.055467,301.742933 L268.055467,405.4656 L295.831467,405.4656 L295.831467,277.3376 L253.527467,277.3376 L231.0848,346.606933 Z M324.951467,277.568 L324.951467,405.696 L408.855467,405.696 L408.855467,383.082667 L353.815467,383.082667 L353.815467,277.568 L324.951467,277.568 Z"></path>
                         </g>
                       </svg>`,
      },
      {
        id: "lorem-ipsum",
        name: "Lorem Ipsum Generator",
        desc: "Generate random text.",
        icon: `<svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 class="h-5 w-5 mr-2 text-blue-500"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 >
                                 <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                                    />
                              </svg>`,
      },
      {
        id: "syntax-highlighter",
        name: "Syntax Highlighter",
        desc: "Highlight and Format code.",
        icon: `<svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 class="h-5 w-5 mr-2 text-blue-500"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 >
                                 <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                              </svg>`,
      },
    ];

    let html = `
                   <div class="max-w-4xl mx-auto text-center mb-8">
                       <h2 class="text-3xl font-bold mb-2">Welcome to Pocket Tools</h2>
                       <p class="text-lg text-gray-600 dark:text-gray-400">Your handy online utilities. Select a tool or pick one below:</p>
                   </div>
                   <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
               `;
    pinnedTools.forEach((tool) => {
      html += `
                       <a href="#${tool.id}" class="dashboard-card" data-tool-link="${tool.id}">
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">${tool.icon}</svg>
                           <h3>${tool.name}</h3>
                           <p>${tool.desc}</p>
                       </a>
                   `;
    });
    html += `</div>`;
    dashboardContentEl.innerHTML = html;

    dashboardContentEl.querySelectorAll("[data-tool-link]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const toolId = link.getAttribute("data-tool-link");
        setActiveTool(toolId);
      });
    });
  }
  generateDashboardContent();

  if (window.location.hash) {
    const toolIdFromHash = window.location.hash.substring(1);
    const toolExists = Array.from(toolButtons).some(
      (btn) => btn.getAttribute("data-tool") === toolIdFromHash
    );
    setActiveTool(toolExists ? toolIdFromHash : "dashboard");
  } else {
    setActiveTool("dashboard");
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  }

  function showStatus(elementId, message, isError = false) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = message;
      el.className = `text-sm ${
        isError
          ? "text-red-500 dark:text-red-400"
          : "text-green-500 dark:text-green-400"
      }`;
    }
  }

  function genericCopy(textToCopy, buttonElement) {
    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          const originalText = buttonElement.textContent;
          buttonElement.textContent = "Copied!";
          setTimeout(() => {
            buttonElement.textContent = originalText;
          }, 1500);
        })
        .catch((err) => {
          console.warn("Async copy failed:", err);
          try {
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            textArea.style.position = "fixed";
            textArea.style.opacity = 0;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);

            const originalText = buttonElement.textContent;
            buttonElement.textContent = "Copied!";
            setTimeout(() => {
              buttonElement.textContent = originalText;
            }, 1500);
          } catch (e) {
            alert("Failed to copy.");
          }
        });
    }
  }

  function addCopyListener(buttonId, targetIdOrGetter) {
    const btn = document.getElementById(buttonId);
    if (btn) {
      btn.addEventListener("click", () => {
        let text;
        if (typeof targetIdOrGetter === "function") {
          text = targetIdOrGetter();
        } else {
          const target = document.getElementById(targetIdOrGetter);
          if (target) {
            text =
              target.value !== undefined ? target.value : target.textContent;
          }
        }
        if (text) {
          genericCopy(text, btn);
        }
      });
    }
  }

  // --- Tool Initializations ---
  initSvgViewer();
  initImageCompressor();
  initImageConverter();
  initJsonBeautifierAndTree();
  initXmlBeautifierAndTree();
  initSyntaxHighlighter();
  initHtmlBeautifier();
  initCssBeautifier();
  initJsBeautifier();
  initHashGenerator();
  initAesEncryptDecrypt();
  initTextComparison();
  initBase64Converter();
  initUrlConverter();
  initMarkdownPreviewer();
  initTextCaseConverter();
  initWordCount();
  initLoremIpsum();
  initQrCodeGenerator();
  initUuidGenerator();
  initPasswordGenerator();
  initUnitConverter();
  initColorPicker();
  initTimestampConverter();
  initTimezoneConverter();
  initRegexTester();
  initNetworkTools();

  // --- Tool Implementations ---
  function initSvgViewer() {
    const inputEl = document.getElementById("svg-input");
    const previewArea = document.getElementById("svg-preview-area");
    const loadExampleBtn = document.getElementById("svg-load-example-btn");
    const clearBtn = document.getElementById("svg-clear-btn");

    const exampleSVG = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
         <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
         <rect x="25" y="25" width="50" height="50" style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9" />
         <text x="50" y="55" font-family="Verdana" font-size="10" fill="white" text-anchor="middle">SVG!</text>
         </svg>`;

    function renderSVG() {
      const svgCode = inputEl.value;
      // Basic sanitization: remove script tags. More robust sanitization is complex.
      const sanitizedCode = svgCode.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ""
      );
      previewArea.innerHTML = sanitizedCode;
      if (!previewArea.querySelector("svg") && sanitizedCode.trim() !== "") {
        previewArea.innerHTML =
          '<p class="text-red-500 dark:text-red-400">Invalid or empty SVG code.</p>';
      } else if (sanitizedCode.trim() === "") {
        previewArea.innerHTML =
          '<p class="text-gray-400 dark:text-gray-500">SVG preview will appear here</p>';
      }
    }

    inputEl.addEventListener("input", renderSVG);
    loadExampleBtn.addEventListener("click", () => {
      inputEl.value = exampleSVG;
      renderSVG();
    });
    clearBtn.addEventListener("click", () => {
      inputEl.value = "";
      renderSVG();
    });
  }

  function initImageCompressor() {
    const uploadArea = document.getElementById("ic-upload-area");
    const imageUpload = document.getElementById("ic-image-upload");
    const imagePreview = document.getElementById("ic-image-preview");
    const previewImg = document.getElementById("ic-preview");
    const originalSizeSpan = document.getElementById("ic-original-size");
    const originalDimensionsSpan = document.getElementById(
      "ic-original-dimensions"
    );
    const qualityControl = document.getElementById("ic-quality-control");
    const sizeControl = document.getElementById("ic-size-control");
    const qualitySlider = document.getElementById("ic-quality");
    const qualityValue = document.getElementById("ic-quality-value");
    const targetSizeInput = document.getElementById("ic-target-size");
    const outputFormatSelect = document.getElementById("ic-output-format");
    const compressBtn = document.getElementById("ic-compress-btn");
    const resultsDiv = document.getElementById("ic-results");
    const compressedSizeSpan = document.getElementById("ic-compressed-size");
    const compressionRatioSpan = document.getElementById(
      "ic-compression-ratio"
    );
    const compressedPreview = document.getElementById("ic-compressed-preview");
    const downloadBtn = document.getElementById("ic-download-btn");
    const compressionModeRadios = document.querySelectorAll(
      'input[name="ic-compression-mode"]'
    );
    let originalImage = null,
      originalFile = null,
      compressedBlob = null;

    if (!uploadArea) return; // Tool not present

    uploadArea.addEventListener("click", () => imageUpload.click());
    imageUpload.addEventListener("change", handleImageUpload);
    qualitySlider.addEventListener(
      "input",
      () => (qualityValue.textContent = qualitySlider.value)
    );
    compressBtn.addEventListener("click", compressImage);

    compressionModeRadios.forEach((radio) => {
      radio.addEventListener("change", function () {
        qualityControl.classList.toggle("hidden", this.value !== "quality");
        sizeControl.classList.toggle("hidden", this.value !== "size");
      });
    });

    function handleImageUpload(e) {
      const file = e.target.files[0];
      if (!file || !file.type.match("image.*")) return;
      originalFile = file;
      originalSizeSpan.textContent = `Size: ${formatFileSize(file.size)} • `;
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImg.src = e.target.result;
        originalImage = new Image();
        originalImage.onload = function () {
          originalDimensionsSpan.textContent = `${this.width}×${this.height} px`;
          imagePreview.classList.remove("hidden");
          compressBtn.disabled = false;
          resultsDiv.classList.add("hidden");
        };
        originalImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    function compressImage() {
      if (!originalImage) return;
      const mode = document.querySelector(
        'input[name="ic-compression-mode"]:checked'
      ).value;
      const outputFormatVal = outputFormatSelect.value;
      const outputFormat =
        outputFormatVal === "auto"
          ? originalFile.type.split("/")[1].toLowerCase()
          : outputFormatVal;

      compressBtn.disabled = true;
      compressBtn.textContent = "Compressing...";
      if (mode === "quality")
        compressByQuality(parseInt(qualitySlider.value), outputFormat);
      else compressToTargetSize(parseInt(targetSizeInput.value), outputFormat);
    }

    function compressByQuality(quality, format) {
      const canvas = document.createElement("canvas");
      canvas.width = originalImage.width;
      canvas.height = originalImage.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(originalImage, 0, 0);
      const mimeType = `image/${format}`;
      canvas.toBlob(
        (blob) => showResults(blob, format),
        mimeType,
        quality / 100
      );
    }

    function compressToTargetSize(targetKB, format) {
      let minQuality = 1,
        maxQuality = 100,
        currentQuality = 50;
      const mimeType = `image/${format}`;
      const targetBytes = targetKB * 1024;
      const canvas = document.createElement("canvas");
      canvas.width = originalImage.width;
      canvas.height = originalImage.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(originalImage, 0, 0);
      let bestBlob = null;
      let attempts = 0;

      function attempt() {
        if (attempts >= 7) {
          showResults(bestBlob || null, format);
          return;
        }
        attempts++;
        currentQuality = Math.round((minQuality + maxQuality) / 2);
        if (currentQuality < 1) currentQuality = 1;
        if (currentQuality > 100) currentQuality = 100;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              showResults(null, format);
              return;
            }
            if (blob.size > targetBytes) {
              maxQuality = currentQuality - 1;
            } else {
              minQuality = currentQuality + 1;
              bestBlob = blob;
            }
            if (
              maxQuality >= minQuality &&
              attempts < 7 &&
              minQuality <= 100 &&
              maxQuality >= 1
            ) {
              attempt();
            } else {
              showResults(bestBlob || blob, format);
            }
          },
          mimeType,
          currentQuality / 100
        );
      }
      attempt();
    }

    function showResults(blob, format) {
      if (!blob) {
        alert(
          "Compression failed. The target size might be too small for the chosen format or image dimensions."
        );
        compressBtn.disabled = false;
        compressBtn.textContent = "Compress Image";
        resultsDiv.classList.add("hidden");
        return;
      }
      compressedBlob = blob;
      const compressedUrl = URL.createObjectURL(blob);
      compressedPreview.src = compressedUrl;
      compressedSizeSpan.textContent = `Size: ${formatFileSize(blob.size)} • `;
      const ratio = (1 - blob.size / originalFile.size) * 100;
      compressionRatioSpan.textContent = `Reduced by ${ratio.toFixed(1)}%`;
      downloadBtn.href = compressedUrl;
      const fileExt = format === "jpeg" ? "jpg" : format;
      downloadBtn.download = `compressed_${Date.now()}.${fileExt}`;
      resultsDiv.classList.remove("hidden");
      compressBtn.disabled = false;
      compressBtn.textContent = "Compress Image";
    }
  }

  function initImageConverter() {
    const uploadArea = document.getElementById("iconv-upload-area");
    const imageUpload = document.getElementById("iconv-image-upload");
    const previewContainer = document.getElementById(
      "iconv-image-preview-container"
    );
    const previewImg = document.getElementById("iconv-preview");
    const originalInfo = document.getElementById("iconv-original-info");
    const outputFormatSelect = document.getElementById("iconv-output-format");
    const qualitySlider = document.getElementById("iconv-quality");
    const qualityValue = document.getElementById("iconv-quality-value");
    const convertBtn = document.getElementById("iconv-convert-btn");
    const resultsDiv = document.getElementById("iconv-results");
    const convertedInfo = document.getElementById("iconv-converted-info");
    const convertedPreview = document.getElementById("iconv-converted-preview");
    const downloadBtn = document.getElementById("iconv-download-btn");
    let originalImage = null,
      originalFile = null;

    if (!uploadArea) return; // Tool not present

    uploadArea.addEventListener("click", () => imageUpload.click());
    qualitySlider.addEventListener(
      "input",
      () => (qualityValue.textContent = qualitySlider.value)
    );

    imageUpload.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith("image/")) return;
      originalFile = file;
      originalInfo.textContent = `Original: ${file.name} (${formatFileSize(
        file.size
      )})`;
      const reader = new FileReader();
      reader.onload = (ev) => {
        previewImg.src = ev.target.result;
        originalImage = new Image();
        originalImage.onload = () => {
          previewContainer.classList.remove("hidden");
          convertBtn.disabled = false;
          resultsDiv.classList.add("hidden");
        };
        originalImage.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });

    convertBtn.addEventListener("click", () => {
      if (!originalImage) return;
      const format = outputFormatSelect.value;
      const quality = parseInt(qualitySlider.value) / 100;
      const mimeType = `image/${format}`;

      convertBtn.disabled = true;
      convertBtn.textContent = "Converting...";

      const canvas = document.createElement("canvas");
      canvas.width = originalImage.naturalWidth;
      canvas.height = originalImage.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (format === "jpeg" || format === "bmp") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(originalImage, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            convertedPreview.src = url;
            downloadBtn.href = url;
            downloadBtn.download = `converted_${Date.now()}.${
              format === "jpeg" ? "jpg" : format
            }`;
            convertedInfo.textContent = `Converted: ${format.toUpperCase()} (${formatFileSize(
              blob.size
            )})`;
            resultsDiv.classList.remove("hidden");
          } else {
            alert(
              "Conversion failed. This format might not be supported by your browser for encoding, or an error occurred."
            );
            convertedInfo.textContent = `Conversion to ${format.toUpperCase()} failed.`;
            resultsDiv.classList.add("hidden");
          }
          convertBtn.disabled = false;
          convertBtn.textContent = "Convert Image";
        },
        mimeType,
        format === "jpeg" || format === "webp" ? quality : undefined
      );
    });
  }

  function initJsonBeautifierAndTree() {
    const inputEl = document.getElementById("json-input");
    const outputCodeEl = document.getElementById("json-output-code");
    const outputPreEl = document.getElementById("json-output-pre");
    const formatBtn = document.getElementById("json-format-btn");
    const minifyBtn = document.getElementById("json-minify-btn");
    const clearBtn = document.getElementById("json-clear-btn");
    const indentSelect = document.getElementById("json-indent");
    const statusEl = document.getElementById("json-status");
    const treeViewContainer = document.getElementById(
      "json-tree-view-container"
    );
    const showFormattedBtn = document.getElementById("json-show-formatted-btn");
    const showTreeBtn = document.getElementById("json-show-tree-btn");
    const outputLabel = document.getElementById("json-output-label");
    const treeLabel = document.getElementById("json-tree-label");
    const copyOutputBtn = document.getElementById("json-copy-output-btn");

    if (!inputEl) return; // Tool not present

    addCopyListener("json-copy-output-btn", () => outputCodeEl.textContent);

    function toggleView(showFormatted) {
      outputPreEl.style.display = showFormatted ? "block" : "none";
      outputLabel.style.display = showFormatted ? "block" : "none";
      copyOutputBtn.style.display = showFormatted ? "inline-flex" : "none";

      treeViewContainer.style.display = showFormatted ? "none" : "block";
      treeLabel.style.display = showFormatted ? "none" : "block";

      showFormattedBtn.classList.toggle("active", showFormatted);
      showFormattedBtn.classList.toggle("btn-primary", showFormatted);
      showFormattedBtn.classList.toggle("btn-secondary", !showFormatted);

      showTreeBtn.classList.toggle("active", !showFormatted);
      showTreeBtn.classList.toggle("btn-primary", !showFormatted);
      showTreeBtn.classList.toggle("btn-secondary", showFormatted);
    }

    showFormattedBtn.addEventListener("click", () => toggleView(true));
    showTreeBtn.addEventListener("click", () => toggleView(false));
    toggleView(true);

    function buildJsonTree(data, parentElement) {
      parentElement.innerHTML = "";
      const ul = document.createElement("ul");
      ul.className = "tree-view";
      if (Object.keys(data).length === 0 && !Array.isArray(data)) {
        parentElement.innerHTML =
          '<p class="text-gray-500 dark:text-gray-400 text-sm p-2">Empty JSON object or invalid structure for tree view.</p>';
        return;
      }
      if (Array.isArray(data) && data.length === 0) {
        parentElement.innerHTML =
          '<p class="text-gray-500 dark:text-gray-400 text-sm p-2">Empty JSON array.</p>';
        return;
      }

      const items = Array.isArray(data) ? data.entries() : Object.entries(data);

      for (const [key, value] of items) {
        const li = document.createElement("li");
        const keySpan = document.createElement("span");
        keySpan.className = "tree-key";
        keySpan.textContent = Array.isArray(data) ? `[${key}]: ` : `"${key}": `;

        let valueSpan;

        if (typeof value === "object" && value !== null) {
          const toggler = document.createElement("span");
          toggler.className = "tree-toggler";
          toggler.textContent = "▸";
          li.className = "tree-node collapsed";
          li.appendChild(toggler);
          li.appendChild(keySpan);

          const childUl = document.createElement("ul");
          buildJsonTree(value, childUl);
          li.appendChild(childUl);

          toggler.onclick = (e) => {
            e.stopPropagation();
            li.classList.toggle("collapsed");
            toggler.textContent = li.classList.contains("collapsed")
              ? "▸"
              : "▾";
          };
        } else {
          li.appendChild(keySpan);
          valueSpan = document.createElement("span");
          if (typeof value === "string") {
            valueSpan.className = "tree-value-string";
            valueSpan.textContent = `"${value}"`;
          } else if (typeof value === "number") {
            valueSpan.className = "tree-value-number";
            valueSpan.textContent = value;
          } else if (typeof value === "boolean") {
            valueSpan.className = "tree-value-boolean";
            valueSpan.textContent = value;
          } else if (value === null) {
            valueSpan.className = "tree-value-null";
            valueSpan.textContent = "null";
          }
          li.appendChild(valueSpan);
        }
        ul.appendChild(li);
      }
      parentElement.appendChild(ul);
    }

    function processJson(minify = false) {
      try {
        const jsonObj = JSON.parse(inputEl.value);
        const indentValue = minify
          ? 0
          : indentSelect.value === "tab"
          ? "\t"
          : parseInt(indentSelect.value);
        outputCodeEl.textContent = JSON.stringify(jsonObj, null, indentValue);
        Prism.highlightElement(outputCodeEl);
        buildJsonTree(jsonObj, treeViewContainer);
        showStatus(
          "json-status",
          minify
            ? "JSON minified successfully!"
            : "JSON formatted successfully!"
        );
      } catch (e) {
        outputCodeEl.textContent = "";
        Prism.highlightElement(outputCodeEl); // Clear highlight
        treeViewContainer.innerHTML =
          '<p class="text-red-500 p-2">Invalid JSON input.</p>';
        showStatus("json-status", "Invalid JSON: " + e.message, true);
      }
    }

    formatBtn.addEventListener("click", () => processJson(false));
    minifyBtn.addEventListener("click", () => processJson(true));

    clearBtn.addEventListener("click", () => {
      inputEl.value = "";
      outputCodeEl.textContent = "";
      Prism.highlightElement(outputCodeEl);
      treeViewContainer.innerHTML = "";
      statusEl.textContent = "";
      showStatus("json-status", "");
    });
  }

  function initXmlBeautifierAndTree() {
    const inputEl = document.getElementById("xml-input");
    const outputCodeEl = document.getElementById("xml-output-code");
    const outputPreEl = document.getElementById("xml-output-pre");
    const formatBtn = document.getElementById("xml-format-btn");
    const clearBtn = document.getElementById("xml-clear-btn");
    const statusEl = document.getElementById("xml-status");
    const treeViewContainer = document.getElementById(
      "xml-tree-view-container"
    );
    const showFormattedBtn = document.getElementById("xml-show-formatted-btn");
    const showTreeBtn = document.getElementById("xml-show-tree-btn");
    const outputLabel = document.getElementById("xml-output-label");
    const treeLabel = document.getElementById("xml-tree-label");
    const copyOutputBtn = document.getElementById("xml-copy-output-btn");

    if (!inputEl) return; // Tool not present

    addCopyListener("xml-copy-output-btn", () => outputCodeEl.textContent);

    function toggleView(showFormatted) {
      outputPreEl.style.display = showFormatted ? "block" : "none";
      outputLabel.style.display = showFormatted ? "block" : "none";
      copyOutputBtn.style.display = showFormatted ? "inline-flex" : "none";

      treeViewContainer.style.display = showFormatted ? "none" : "block";
      treeLabel.style.display = showFormatted ? "none" : "block";

      showFormattedBtn.classList.toggle("active", showFormatted);
      showFormattedBtn.classList.toggle("btn-primary", showFormatted);
      showFormattedBtn.classList.toggle("btn-secondary", !showFormatted);

      showTreeBtn.classList.toggle("active", !showFormatted);
      showTreeBtn.classList.toggle("btn-primary", !showFormatted);
      showTreeBtn.classList.toggle("btn-secondary", showFormatted);
    }
    showFormattedBtn.addEventListener("click", () => toggleView(true));
    showTreeBtn.addEventListener("click", () => toggleView(false));
    toggleView(true);

    function formatXml(xml) {
      // Using html_beautify for XML as it handles it reasonably well
      try {
        if (typeof html_beautify !== "undefined") {
          return html_beautify(xml, { indent_size: 2, unformatted: [] });
        }
      } catch (e) {
        /* fallback or error */
      }

      // Fallback basic formatter (less robust)
      let formatted = "",
        indent = "";
      const tab = "  ";
      xml.split(/>\s*</).forEach((node) => {
        if (node.match(/^\/\w/)) indent = indent.substring(tab.length);
        let currentIndent = indent;
        const selfClosingOrCommentOrPI = node.match(
          /^(?:[^>]*\/>|\?.*\?|!--.*--)$/
        );
        formatted += currentIndent + "<" + node + ">\r\n";
        if (node.match(/^<?\w[^>]*[^\/]$/) && !selfClosingOrCommentOrPI) {
          indent += tab;
        }
      });
      return formatted.trim();
    }

    function buildXmlTree(xmlNode, parentElement) {
      const li = document.createElement("li");
      const nodeContainer = document.createElement("div");

      const toggler = document.createElement("span");
      toggler.className = "tree-toggler";

      const tagSpan = document.createElement("span");
      tagSpan.className = "xml-tag";
      tagSpan.textContent = `<${xmlNode.nodeName}`;
      nodeContainer.appendChild(tagSpan);

      if (xmlNode.attributes && xmlNode.attributes.length > 0) {
        for (let i = 0; i < xmlNode.attributes.length; i++) {
          const attr = xmlNode.attributes[i];
          const attrNameSpan = document.createElement("span");
          attrNameSpan.className = "xml-attribute-name";
          attrNameSpan.textContent = ` ${attr.name}`;
          nodeContainer.appendChild(attrNameSpan);
          const attrEqSpan = document.createElement("span");
          attrEqSpan.textContent = `=`;
          nodeContainer.appendChild(attrEqSpan);
          const attrValSpan = document.createElement("span");
          attrValSpan.className = "xml-attribute-value";
          attrValSpan.textContent = `"${attr.value}"`;
          nodeContainer.appendChild(attrValSpan);
        }
      }

      const childNodesArray = Array.from(xmlNode.childNodes);
      const elementChildren = childNodesArray.filter(
        (n) => n.nodeType === Node.ELEMENT_NODE
      );
      const textChildren = childNodesArray.filter(
        (n) => n.nodeType === Node.TEXT_NODE && n.nodeValue.trim()
      );

      const isSelfClosing =
        elementChildren.length === 0 &&
        textChildren.length === 0 &&
        xmlNode.childNodes.length === 0;

      if (isSelfClosing && xmlNode.nodeType === Node.ELEMENT_NODE) {
        tagSpan.textContent += ` />`;
      } else {
        tagSpan.textContent += `>`;
      }

      if (elementChildren.length > 0 || textChildren.length > 0) {
        toggler.textContent = "▸";
        li.className = "tree-node collapsed";
        li.appendChild(toggler);
      } else {
        toggler.textContent = " "; // Keep space for alignment
        li.appendChild(toggler);
      }
      li.appendChild(nodeContainer);

      if (elementChildren.length > 0 || textChildren.length > 0) {
        const childUl = document.createElement("ul");
        elementChildren.forEach((child) => buildXmlTree(child, childUl));
        textChildren.forEach((child) => {
          const textLi = document.createElement("li");
          textLi.style.listStyleType = "none"; // No bullet for text
          const textSpan = document.createElement("span");
          textSpan.className = "xml-text-node";
          textSpan.textContent = child.nodeValue.trim();
          textLi.appendChild(textSpan);
          childUl.appendChild(textLi);
        });
        li.appendChild(childUl);
      }

      if (!isSelfClosing && xmlNode.nodeType === Node.ELEMENT_NODE) {
        const closingTagSpan = document.createElement("span");
        closingTagSpan.className = "xml-tag";
        closingTagSpan.textContent = `</${xmlNode.nodeName}>`;

        const closingDiv = document.createElement("div"); // Wrap in div for new line behavior
        // Indent closing tag slightly if it's on a new line
        if (elementChildren.length > 0 || textChildren.length > 0) {
          closingDiv.style.paddingLeft = "1em"; // Match tree toggler margin + ul padding
        }
        closingDiv.appendChild(closingTagSpan);
        li.appendChild(closingDiv);
      }

      toggler.onclick = (e) => {
        if (!li.classList.contains("tree-node")) return;
        e.stopPropagation();
        li.classList.toggle("collapsed");
        toggler.textContent = li.classList.contains("collapsed") ? "▸" : "▾";
      };
      parentElement.appendChild(li);
    }

    function processXml() {
      const xmlString = inputEl.value;
      treeViewContainer.innerHTML = "";
      if (!xmlString.trim()) {
        outputCodeEl.textContent = "";
        Prism.highlightElement(outputCodeEl);
        showStatus("xml-status", "Input is empty.", true);
        return;
      }
      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "application/xml");
        const parseError = xmlDoc.getElementsByTagName("parsererror");
        if (parseError.length > 0) {
          throw new Error(
            "Invalid XML: " +
              parseError[0].textContent
                .split("\n")[0]
                .replace(/<[^>]+>/g, "")
                .trim()
          );
        }

        outputCodeEl.textContent = formatXml(xmlString);
        Prism.highlightElement(outputCodeEl);

        const rootElement = xmlDoc.documentElement;
        if (rootElement) {
          const rootUl = document.createElement("ul");
          rootUl.className = "tree-view";
          buildXmlTree(rootElement, rootUl);
          treeViewContainer.appendChild(rootUl);
        } else {
          treeViewContainer.innerHTML =
            '<p class="text-red-500 p-2">No root element found in XML.</p>';
        }
        showStatus("xml-status", "XML processed successfully!");
      } catch (e) {
        outputCodeEl.textContent = xmlString; // Show original on error
        Prism.highlightElement(outputCodeEl);
        treeViewContainer.innerHTML = `<p class="text-red-500 p-2">${e.message}</p>`;
        showStatus("xml-status", e.message, true);
      }
    }

    formatBtn.addEventListener("click", processXml);
    clearBtn.addEventListener("click", () => {
      inputEl.value = "";
      outputCodeEl.textContent = "";
      Prism.highlightElement(outputCodeEl);
      treeViewContainer.innerHTML = "";
      statusEl.textContent = "";
      showStatus("xml-status", "");
    });
  }

  function initSyntaxHighlighter() {
    const languageSelect = document.getElementById("sh-language");
    const inputArea = document.getElementById("sh-input");
    const outputCode = document.getElementById("sh-output-code");
    const outputPre = document.getElementById("sh-output-pre");
    const formatBtn = document.getElementById("sh-format-code-btn");
    const statusEl = document.getElementById("sh-status");

    if (!inputArea) return; // Tool not present
    addCopyListener("sh-copy-input-btn", "sh-input");

    addCopyListener("sh-copy-output-btn", "sh-output-code");

    function highlight() {
      const code = inputArea.value;
      const language = languageSelect.value;
      outputCode.textContent = code;
      outputCode.className = `language-${language}`;
      Prism.highlightElement(outputCode);
    }

    formatBtn.addEventListener("click", () => {
      const lang = languageSelect.value;
      let formattedCode = inputArea.value;
      let beautifierUsed = false;
      showStatus("sh-status", "");
      try {
        if (lang === "javascript" && typeof js_beautify !== "undefined") {
          formattedCode = js_beautify(inputArea.value, {
            indent_size: 2,
          });
          beautifierUsed = true;
        } else if (
          (lang === "markup" ||
            lang === "html" ||
            lang === "xml" ||
            lang === "svg" ||
            lang === "json") &&
          typeof html_beautify !== "undefined"
        ) {
          // html_beautify can handle JSON and XML-like structures
          formattedCode = html_beautify(inputArea.value, {
            indent_size: 2,
          });
          beautifierUsed = true;
        } else if (lang === "css" && typeof css_beautify !== "undefined") {
          formattedCode = css_beautify(inputArea.value, {
            indent_size: 2,
          });
          beautifierUsed = true;
        }
        inputArea.value = formattedCode;
        highlight();
        if (beautifierUsed) {
          showStatus("sh-status", "Code formatted successfully.");
        } else {
          showStatus(
            "sh-status",
            "No beautifier available for this language.",
            true
          );
        }
      } catch (e) {
        showStatus("sh-status", "Error formatting code: " + e.message, true);
      }
    });

    inputArea.addEventListener("input", highlight);
    languageSelect.addEventListener("change", () => {
      showStatus("sh-status", ""); // Clear status on lang change
      highlight();
    });
    highlight();
  }

  function initHtmlBeautifier() {
    const input = document.getElementById("html-beautify-input");
    const output = document.getElementById("html-beautify-output");
    const beautifyBtn = document.getElementById("html-beautify-btn");
    const statusEl = document.getElementById("html-beautify-status");

    if (!input) return; // Tool not present
    addCopyListener("html-copy-beautify-output-btn", "html-beautify-output");

    beautifyBtn.addEventListener("click", () => {
      try {
        if (typeof html_beautify === "undefined")
          throw new Error("HTML beautifier library not loaded.");
        output.value = html_beautify(input.value, { indent_size: 2 });
        showStatus("html-beautify-status", "HTML beautified successfully!");
      } catch (e) {
        output.value = input.value;
        showStatus("html-beautify-status", "Error: " + e.message, true);
      }
    });
  }
  function initCssBeautifier() {
    const input = document.getElementById("css-beautify-input");
    const output = document.getElementById("css-beautify-output");
    const beautifyBtn = document.getElementById("css-beautify-btn");
    const statusEl = document.getElementById("css-beautify-status");

    if (!input) return; // Tool not present
    addCopyListener("css-copy-beautify-output-btn", "css-beautify-output");

    beautifyBtn.addEventListener("click", () => {
      try {
        if (typeof css_beautify === "undefined")
          throw new Error("CSS beautifier library not loaded.");
        output.value = css_beautify(input.value, { indent_size: 2 });
        showStatus("css-beautify-status", "CSS beautified successfully!");
      } catch (e) {
        output.value = input.value;
        showStatus("css-beautify-status", "Error: " + e.message, true);
      }
    });
  }
  function initJsBeautifier() {
    const input = document.getElementById("js-beautify-input");
    const output = document.getElementById("js-beautify-output");
    const beautifyBtn = document.getElementById("js-beautify-btn");
    const statusEl = document.getElementById("js-beautify-status");

    if (!input) return; // Tool not present
    addCopyListener("js-copy-beautify-output-btn", "js-beautify-output");
    beautifyBtn.addEventListener("click", () => {
      try {
        if (typeof js_beautify === "undefined")
          throw new Error("JS beautifier library not loaded.");
        output.value = js_beautify(input.value, { indent_size: 2 });
        showStatus("js-beautify-status", "JavaScript beautified successfully!");
      } catch (e) {
        output.value = input.value;
        showStatus("js-beautify-status", "Error: " + e.message, true);
      }
    });
  }

  function initHashGenerator() {
    const inputEl = document.getElementById("hash-input");
    const algoSelect = document.getElementById("hash-algorithm");
    const generateBtn = document.getElementById("hash-generate-btn");
    const outputEl = document.getElementById("hash-output");

    if (!inputEl) return; // Tool not present
    addCopyListener("hash-copy-output-btn", "hash-output");

    generateBtn.addEventListener("click", async () => {
      const text = inputEl.value;
      const algo = algoSelect.value;
      if (!text) {
        outputEl.value = "Please enter text to hash.";
        return;
      }
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(algo, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        outputEl.value = hashHex;
      } catch (e) {
        outputEl.value = "Error generating hash: " + e.message;
      }
    });
  }

  function initAesEncryptDecrypt() {
    const textInput = document.getElementById("aes-text-input");
    const passwordInput = document.getElementById("aes-password");
    const encryptBtn = document.getElementById("aes-encrypt-btn");
    const decryptBtn = document.getElementById("aes-decrypt-btn");
    const outputArea = document.getElementById("aes-output");
    const statusEl = document.getElementById("aes-status");

    if (!textInput) return; // Tool not present
    addCopyListener("aes-copy-output-btn", "aes-output");

    async function getKey(password, salt) {
      const enc = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
      );
      return crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: salt,
          iterations: 100000,
          hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );
    }

    encryptBtn.addEventListener("click", async () => {
      try {
        const plaintext = textInput.value;
        const password = passwordInput.value;
        if (!plaintext || !password) {
          showStatus("aes-status", "Text and password are required.", true);
          return;
        }
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await getKey(password, salt);
        const enc = new TextEncoder();
        const encodedPlaintext = enc.encode(plaintext);
        const ciphertextBuffer = await crypto.subtle.encrypt(
          { name: "AES-GCM", iv: iv },
          key,
          encodedPlaintext
        );

        const combined = new Uint8Array(
          salt.length + iv.length + ciphertextBuffer.byteLength
        );
        combined.set(salt, 0);
        combined.set(iv, salt.length);
        combined.set(new Uint8Array(ciphertextBuffer), salt.length + iv.length);

        outputArea.value = btoa(String.fromCharCode.apply(null, combined));
        showStatus("aes-status", "Encryption successful.");
      } catch (e) {
        showStatus("aes-status", "Encryption failed: " + e.message, true);
      }
    });

    decryptBtn.addEventListener("click", async () => {
      try {
        const base64Input = textInput.value;
        const password = passwordInput.value;
        if (!base64Input || !password) {
          showStatus(
            "aes-status",
            "Encrypted text (from input) and password are required.",
            true
          );
          return;
        }

        const combined = Uint8Array.from(atob(base64Input), (c) =>
          c.charCodeAt(0)
        );
        if (combined.length < 28) {
          // salt (16) + iv (12)
          throw new Error("Ciphertext is too short.");
        }
        const salt = combined.slice(0, 16);
        const iv = combined.slice(16, 16 + 12);
        const ciphertext = combined.slice(16 + 12);

        const key = await getKey(password, salt);
        const decryptedBuffer = await crypto.subtle.decrypt(
          { name: "AES-GCM", iv: iv },
          key,
          ciphertext
        );
        const dec = new TextDecoder();
        outputArea.value = dec.decode(decryptedBuffer);
        showStatus("aes-status", "Decryption successful.");
      } catch (e) {
        outputArea.value = "";
        showStatus(
          "aes-status",
          "Decryption failed: " +
            e.message +
            ". Ensure correct password and Base64 ciphertext format.",
          true
        );
      }
    });
  }

  function initTextComparison() {
    const input1El = document.getElementById("text-compare-input1");
    const input2El = document.getElementById("text-compare-input2");
    const compareBtn = document.getElementById("text-compare-btn");
    const resultEl = document.getElementById("text-compare-result");

    if (!input1El) return; // Tool not present
    const resultPre = resultEl.querySelector("pre");

    compareBtn.addEventListener("click", () => {
      const text1Lines = input1El.value.split("\n");
      const text2Lines = input2El.value.split("\n");
      let diffOutput = "";

      const maxLines = Math.max(text1Lines.length, text2Lines.length);
      let differencesFound = false;
      for (let i = 0; i < maxLines; i++) {
        const line1 = text1Lines[i] === undefined ? null : text1Lines[i];
        const line2 = text2Lines[i] === undefined ? null : text2Lines[i];

        if (line1 === line2) {
          diffOutput += `  ${line1 === null ? "" : escapeHtml(line1)}\n`;
        } else {
          differencesFound = true;
          if (line1 !== null) diffOutput += `- ${escapeHtml(line1)}\n`;
          if (line2 !== null) diffOutput += `+ ${escapeHtml(line2)}\n`;
        }
      }
      resultPre.innerHTML = diffOutput || "Texts are identical or empty.";
      if (differencesFound) {
        resultPre.innerHTML = diffOutput
          .replace(
            /- .*\n?/g,
            (match) =>
              `<span class="text-red-500 dark:text-red-400">${match}</span>`
          )
          .replace(
            /\+ .*\n?/g,
            (match) =>
              `<span class="text-green-500 dark:text-green-400">${match}</span>`
          );
      }
      resultEl.classList.remove("hidden");
    });
  }

  function initBase64Converter() {
    const inputEl = document.getElementById("base64-input");
    const outputEl = document.getElementById("base64-output");
    const encodeBtn = document.getElementById("base64-encode-btn");
    const decodeBtn = document.getElementById("base64-decode-btn");
    const statusEl = document.getElementById("base64-status");

    if (!inputEl) return; // Tool not present
    addCopyListener("base64-copy-output-btn", "base64-output");

    encodeBtn.addEventListener("click", () => {
      try {
        const utf8Bytes = new TextEncoder().encode(inputEl.value);
        const binaryString = String.fromCharCode(...utf8Bytes);
        outputEl.value = btoa(binaryString);
        showStatus("base64-status", "Encoded successfully!");
      } catch (e) {
        outputEl.value = "";
        showStatus("base64-status", "Error encoding: " + e.message, true);
      }
    });
    decodeBtn.addEventListener("click", () => {
      try {
        const binaryString = atob(inputEl.value);
        const utf8Bytes = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
        outputEl.value = new TextDecoder().decode(utf8Bytes);
        showStatus("base64-status", "Decoded successfully!");
      } catch (e) {
        outputEl.value = "";
        showStatus(
          "base64-status",
          "Error decoding: Invalid Base64 string or UTF-8. " + e.message,
          true
        );
      }
    });
  }

  function initUrlConverter() {
    const inputEl = document.getElementById("url-input");
    const outputEl = document.getElementById("url-output");
    const encodeBtn = document.getElementById("url-encode-btn");
    const decodeBtn = document.getElementById("url-decode-btn");
    const statusEl = document.getElementById("url-status");

    if (!inputEl) return; // Tool not present
    addCopyListener("url-copy-output-btn", "url-output");

    encodeBtn.addEventListener("click", () => {
      try {
        outputEl.value = encodeURIComponent(inputEl.value);
        showStatus("url-status", "Encoded successfully!");
      } catch (e) {
        outputEl.value = "";
        showStatus("url-status", "Error: " + e.message, true);
      }
    });
    decodeBtn.addEventListener("click", () => {
      try {
        outputEl.value = decodeURIComponent(inputEl.value);
        showStatus("url-status", "Decoded successfully!");
      } catch (e) {
        outputEl.value = "";
        showStatus(
          "url-status",
          "Error decoding: Malformed URI. " + e.message,
          true
        );
      }
    });
  }

  function initMarkdownPreviewer() {
    const markdownInput = document.getElementById("markdown-input");
    const previewOutput = document.getElementById("markdown-preview");

    if (!markdownInput) return; // Tool not present

    if (typeof marked === "undefined") {
      previewOutput.innerHTML =
        "<p class='text-red-500'>Error: marked.js library not loaded.</p>";
      return;
    }
    marked.setOptions({ breaks: true, gfm: true });
    function renderMarkdown() {
      previewOutput.innerHTML = marked.parse(markdownInput.value);
    }
    markdownInput.addEventListener("input", renderMarkdown);
    renderMarkdown();
  }

  function initTextCaseConverter() {
    const inputEl = document.getElementById("text-case-input");
    const outputEl = document.getElementById("text-case-output");
    const buttons = document.querySelectorAll(".text-case-btn");

    if (!inputEl) return; // Tool not present
    addCopyListener("text-case-copy-output-btn", "text-case-output");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = inputEl.value;
        const caseType = btn.dataset.case;
        let result = "";
        switch (caseType) {
          case "uppercase":
            result = text.toUpperCase();
            break;
          case "lowercase":
            result = text.toLowerCase();
            break;
          case "sentencecase":
            result = text
              .toLowerCase()
              .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
            break;
          case "titlecase":
            result = text
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
            break;
          case "camelcase":
            result = text
              .toLowerCase()
              .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
              .replace(/^(.)/, (c) => c.toLowerCase());
            break;
          case "pascalcase":
            result = text
              .toLowerCase()
              .split(/[^a-zA-Z0-9]/)
              .filter((w) => w)
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join("");
            break;
          case "kebabcase":
            result = text
              .replace(/([a-z])([A-Z])/g, "$1-$2")
              .replace(/[\s_]+/g, "-")
              .toLowerCase()
              .replace(/[^a-z0-9-]/g, "")
              .replace(/-+/g, "-");
            break;
          case "snakecase":
            result = text
              .replace(/([a-z])([A-Z])/g, "$1_$2")
              .replace(/[\s-]+/g, "_")
              .toLowerCase()
              .replace(/[^a-z0-9_]/g, "")
              .replace(/_+/g, "_");
            break;
        }
        outputEl.value = result;
      });
    });
  }

  function initWordCount() {
    const inputEl = document.getElementById("word-count-input");
    const wordsSpan = document.getElementById("wc-words");
    const charsSpacesSpan = document.getElementById("wc-chars-spaces");
    const charsNoSpacesSpan = document.getElementById("wc-chars-nospaces");
    const sentencesSpan = document.getElementById("wc-sentences");
    const paragraphsSpan = document.getElementById("wc-paragraphs");

    if (!inputEl) return; // Tool not present

    inputEl.addEventListener("input", () => {
      const text = inputEl.value;
      wordsSpan.textContent = (text.match(/\b\S+\b/g) || []).length;
      charsSpacesSpan.textContent = text.length;
      charsNoSpacesSpan.textContent = text.replace(/\s/g, "").length;
      sentencesSpan.textContent = (
        text.match(
          /[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/g
        ) || []
      ).length;
      paragraphsSpan.textContent = text
        ? (text.split(/\n\s*\n/).filter((p) => p.trim() !== "") || []).length
        : 0;
    });
  }

  function initLoremIpsum() {
    const paragraphsInput = document.getElementById("lorem-paragraphs");
    const generateBtn = document.getElementById("lorem-generate-btn");
    const outputEl = document.getElementById("lorem-output");

    if (!paragraphsInput) return; // Tool not present
    addCopyListener("lorem-copy-output-btn", "lorem-output");

    const loremBase =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    generateBtn.addEventListener("click", () => {
      const numParagraphs = parseInt(paragraphsInput.value) || 1;
      let result = "";
      for (let i = 0; i < numParagraphs; i++) {
        result += loremBase + (i < numParagraphs - 1 ? "\n\n" : "");
      }
      outputEl.value = result;
    });
    generateBtn.click();
  }

  function initQrCodeGenerator() {
    const textInput = document.getElementById("qr-text-input");
    const generateBtn = document.getElementById("qr-generate-btn");
    const canvasDiv = document.getElementById("qr-code-canvas");
    const statusEl = document.getElementById("qr-status");
    let qrCodeInstance = null;

    if (!textInput) return; // Tool not present

    if (typeof QRCode === "undefined") {
      showStatus("qr-status", "Error: qrcode.js library not loaded.", true);
      generateBtn.disabled = true;
      return;
    }

    generateBtn.addEventListener("click", () => {
      const text = textInput.value;
      if (!text) {
        showStatus("qr-status", "Please enter text for the QR code.", true);
        canvasDiv.innerHTML = "";
        qrCodeInstance = null;
        return;
      }
      canvasDiv.innerHTML = "";
      try {
        qrCodeInstance = new QRCode(canvasDiv, {
          text: text,
          width: 128,
          height: 128,
          colorDark: document.documentElement.classList.contains("dark")
            ? "#FFFFFF"
            : "#000000",
          colorLight: document.documentElement.classList.contains("dark")
            ? "#1f2937"
            : "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
        showStatus("qr-status", "QR Code generated successfully.");
      } catch (e) {
        qrCodeInstance = null;
        showStatus("qr-status", "Error generating QR Code: " + e.message, true);
      }
    });
  }

  function initUuidGenerator() {
    const generateBtn = document.getElementById("uuid-generate-btn");
    const outputEl = document.getElementById("uuid-output");
    const copyBtn = document.getElementById("uuid-copy-btn");

    if (!generateBtn) return; // Tool not present

    generateBtn.addEventListener("click", () => {
      outputEl.value = crypto.randomUUID();
    });
    copyBtn.addEventListener("click", () => {
      genericCopy(outputEl.value, copyBtn);
    });
  }

  function initPasswordGenerator() {
    const lengthSlider = document.getElementById("pg-length");
    const lengthValue = document.getElementById("pg-length-value");
    const uppercaseCheck = document.getElementById("pg-uppercase");
    const lowercaseCheck = document.getElementById("pg-lowercase");
    const numbersCheck = document.getElementById("pg-numbers");
    const symbolsCheck = document.getElementById("pg-symbols");
    const generateBtn = document.getElementById("pg-generate-btn");
    const outputEl = document.getElementById("pg-output");
    const copyBtn = document.getElementById("pg-copy-btn");
    const strengthEl = document.getElementById("pg-strength");

    if (!lengthSlider) return; // Tool not present

    const chars = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    };

    lengthSlider.addEventListener(
      "input",
      () => (lengthValue.textContent = lengthSlider.value)
    );
    generateBtn.addEventListener("click", () => {
      const length = parseInt(lengthSlider.value);
      let charSet = "";
      if (uppercaseCheck.checked) charSet += chars.uppercase;
      if (lowercaseCheck.checked) charSet += chars.lowercase;
      if (numbersCheck.checked) charSet += chars.numbers;
      if (symbolsCheck.checked) charSet += chars.symbols;

      if (charSet === "") {
        outputEl.value = "Select at least one character type!";
        strengthEl.textContent = "";
        return;
      }
      let password = "";
      const randomValues = new Uint32Array(length);
      crypto.getRandomValues(randomValues);
      for (let i = 0; i < length; i++) {
        password += charSet[randomValues[i] % charSet.length];
      }
      outputEl.value = password;

      let strengthScore = 0;
      if (length >= 8) strengthScore++;
      if (length >= 12) strengthScore++;
      if (length >= 16) strengthScore++;
      if (uppercaseCheck.checked && length > 0) strengthScore++;
      if (lowercaseCheck.checked && length > 0) strengthScore++;
      if (numbersCheck.checked && length > 0) strengthScore++;
      if (symbolsCheck.checked && length > 0) strengthScore++;

      if (strengthScore <= 2) strengthEl.textContent = "Strength: Weak";
      else if (strengthScore <= 4) strengthEl.textContent = "Strength: Medium";
      else if (strengthScore <= 6) strengthEl.textContent = "Strength: Strong";
      else strengthEl.textContent = "Strength: Very Strong";
    });
    copyBtn.addEventListener("click", () => {
      genericCopy(outputEl.value, copyBtn);
    });
    generateBtn.click();
  }

  function initUnitConverter() {
    const categorySelect = document.getElementById("uc-category");
    const valueInput = document.getElementById("uc-value");
    const fromUnitSelect = document.getElementById("uc-from-unit");
    const toUnitSelect = document.getElementById("uc-to-unit");
    const convertBtn = document.getElementById("uc-convert-btn");
    const resultP = document.getElementById("uc-result");

    if (!categorySelect) return; // Tool not present
    addCopyListener("uc-copy-result-btn", "uc-result");

    const units = {
      length: {
        cm: {
          name: "Centimeters (cm)",
          to_base: (v) => v / 100,
          from_base: (v) => v * 100,
        },
        m: {
          name: "Meters (m)",
          to_base: (v) => v,
          from_base: (v) => v,
          base: true,
        },
        km: {
          name: "Kilometers (km)",
          to_base: (v) => v * 1000,
          from_base: (v) => v / 1000,
        },
        in: {
          name: "Inches (in)",
          to_base: (v) => v * 0.0254,
          from_base: (v) => v / 0.0254,
        },
        ft: {
          name: "Feet (ft)",
          to_base: (v) => v * 0.3048,
          from_base: (v) => v / 0.3048,
        },
        yd: {
          name: "Yards (yd)",
          to_base: (v) => v * 0.9144,
          from_base: (v) => v / 0.9144,
        },
        mi: {
          name: "Miles (mi)",
          to_base: (v) => v * 1609.34,
          from_base: (v) => v / 1609.34,
        },
      },
      weight: {
        g: {
          name: "Grams (g)",
          to_base: (v) => v / 1000,
          from_base: (v) => v * 1000,
        },
        kg: {
          name: "Kilograms (kg)",
          to_base: (v) => v,
          from_base: (v) => v,
          base: true,
        },
        lb: {
          name: "Pounds (lb)",
          to_base: (v) => v * 0.453592,
          from_base: (v) => v / 0.453592,
        },
        oz: {
          name: "Ounces (oz)",
          to_base: (v) => v * 0.0283495,
          from_base: (v) => v / 0.0283495,
        },
      },
      temperature: {
        c: { name: "Celsius (°C)" },
        f: { name: "Fahrenheit (°F)" },
        k: { name: "Kelvin (K)" },
      },
    };

    function populateUnitSelectors() {
      const category = categorySelect.value;
      const currentUnits = units[category];
      fromUnitSelect.innerHTML = "";
      toUnitSelect.innerHTML = "";
      for (const unitKey in currentUnits) {
        const optionText = currentUnits[unitKey].name;
        fromUnitSelect.add(new Option(optionText, unitKey));
        toUnitSelect.add(new Option(optionText, unitKey));
      }
      if (fromUnitSelect.options.length > 1) toUnitSelect.selectedIndex = 1;
    }
    categorySelect.addEventListener("change", populateUnitSelectors);
    convertBtn.addEventListener("click", () => {
      const category = categorySelect.value;
      const value = parseFloat(valueInput.value);
      const fromUnitKey = fromUnitSelect.value;
      const toUnitKey = toUnitSelect.value;
      if (isNaN(value)) {
        resultP.textContent = "Please enter a valid number.";
        return;
      }
      let convertedValue;
      if (category === "temperature") {
        if (fromUnitKey === "c") {
          if (toUnitKey === "f") convertedValue = (value * 9) / 5 + 32;
          else if (toUnitKey === "k") convertedValue = value + 273.15;
          else convertedValue = value;
        } else if (fromUnitKey === "f") {
          if (toUnitKey === "c") convertedValue = ((value - 32) * 5) / 9;
          else if (toUnitKey === "k")
            convertedValue = ((value - 32) * 5) / 9 + 273.15;
          else convertedValue = value;
        } else {
          // from Kelvin
          if (toUnitKey === "c") convertedValue = value - 273.15;
          else if (toUnitKey === "f")
            convertedValue = ((value - 273.15) * 9) / 5 + 32;
          else convertedValue = value;
        }
      } else {
        const valueInBase = units[category][fromUnitKey].to_base(value);
        convertedValue = units[category][toUnitKey].from_base(valueInBase);
      }
      const fromUnitName =
        units[category][fromUnitKey].name.match(/\(([^)]+)\)/)?.[1] ||
        fromUnitKey;
      const toUnitName =
        units[category][toUnitKey].name.match(/\(([^)]+)\)/)?.[1] || toUnitKey;
      resultP.textContent = `${value} ${fromUnitName} = ${convertedValue.toFixed(
        4
      )} ${toUnitName}`;
    });
    populateUnitSelectors();
  }

  function initColorPicker() {
    const pickerInput = document.getElementById("color-picker-input");
    const previewDiv = document.getElementById("color-picker-preview");
    const hexOutput = document.getElementById("color-hex");
    const rgbOutput = document.getElementById("color-rgb");
    const hslOutput = document.getElementById("color-hsl");

    if (!pickerInput) return; // Tool not present
    addCopyListener("color-copy-hex", "color-hex");
    addCopyListener("color-copy-rgb", "color-rgb");
    addCopyListener("color-copy-hsl", "color-hsl");

    function updateColors(hexColor) {
      previewDiv.style.backgroundColor = hexColor;
      hexOutput.value = hexColor.toUpperCase();
      const rgb = hexToRgb(hexColor);
      rgbOutput.value = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "N/A";
      const hsl = rgbToHsl(rgb?.r, rgb?.g, rgb?.b);
      hslOutput.value = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "N/A";
    }
    pickerInput.addEventListener("input", (e) => updateColors(e.target.value));
    updateColors(pickerInput.value);
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    }
    function rgbToHsl(r, g, b) {
      if (r == undefined) return null;
      r /= 255;
      g /= 255;
      b /= 255;
      const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      let h,
        s,
        l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
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
  }

  function initTimestampConverter() {
    const unixInput = document.getElementById("ts-unix-input");
    const toHumanBtn = document.getElementById("ts-convert-to-human");
    const humanOutput = document.getElementById("ts-human-output");
    const dateInput = document.getElementById("ts-date-input");
    const toUnixBtn = document.getElementById("ts-convert-to-unix");
    const unixOutput = document.getElementById("ts-unix-output");
    const currentBtn = document.getElementById("ts-current-time");
    const currentOutput = document.getElementById("ts-current-output");

    if (!unixInput) return; // Tool not present
    addCopyListener("ts-copy-human-output-btn", "ts-human-output");
    addCopyListener("ts-copy-unix-output-btn", "ts-unix-output");
    addCopyListener("ts-copy-current-output-btn", "ts-current-output");

    toHumanBtn.addEventListener("click", () => {
      const tsVal = unixInput.value;
      if (!tsVal.trim()) {
        humanOutput.textContent = "Please enter a timestamp.";
        return;
      }
      const ts = parseInt(tsVal);
      if (isNaN(ts)) {
        humanOutput.textContent = "Invalid timestamp format.";
        return;
      }
      const date = new Date(ts * (String(ts).length === 10 ? 1000 : 1));
      humanOutput.textContent = `UTC: ${date.toUTCString()} \nLocal: ${date.toLocaleString()}`;
    });
    toUnixBtn.addEventListener("click", () => {
      if (!dateInput.value) {
        unixOutput.textContent = "Please select a date and time";
        return;
      }
      const date = new Date(dateInput.value);
      unixOutput.textContent = Math.floor(date.getTime() / 1000);
    });
    currentBtn.addEventListener("click", () => {
      const now = Math.floor(Date.now() / 1000);
      currentOutput.textContent = now;
      unixInput.value = now;
      const nowDate = new Date();
      const year = nowDate.getFullYear();
      const month = (nowDate.getMonth() + 1).toString().padStart(2, "0");
      const day = nowDate.getDate().toString().padStart(2, "0");
      const hours = nowDate.getHours().toString().padStart(2, "0");
      const minutes = nowDate.getMinutes().toString().padStart(2, "0");
      dateInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
      toHumanBtn.click();
    });
    currentBtn.click();
  }

  function initTimezoneConverter() {
    const dateTimeLocalInput = document.getElementById("tz-datetime-local");
    const targetTimezoneSelect = document.getElementById("tz-target-timezone");
    const convertBtn = document.getElementById("tz-convert-btn");
    const outputP = document.getElementById("tz-output");

    if (!dateTimeLocalInput) return; // Tool not present
    addCopyListener("tz-copy-output-btn", "tz-output");

    let commonTimezones = [
      "UTC",
      "GMT",
      "America/New_York",
      "America/Chicago",
      "America/Denver",
      "America/Los_Angeles",
      "Europe/London",
      "Europe/Paris",
      "Europe/Berlin",
      "Asia/Tokyo",
      "Asia/Dubai",
      "Asia/Shanghai",
      "Asia/Kolkata",
      "Australia/Sydney",
      "Australia/Perth",
      "Pacific/Auckland",
    ];
    if (typeof Intl !== "undefined" && Intl.supportedValuesOf) {
      try {
        const systemTimezones = Intl.supportedValuesOf("timeZone");
        systemTimezones.forEach((tz) => {
          if (!commonTimezones.includes(tz)) commonTimezones.push(tz);
        });
        commonTimezones.sort();
      } catch (e) {
        console.warn("Could not get system timezones:", e);
      }
    }
    commonTimezones.forEach((tz) => {
      targetTimezoneSelect.add(new Option(tz, tz));
    });
    try {
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (commonTimezones.includes(userTz)) targetTimezoneSelect.value = userTz;
      else {
        const option = new Option(userTz, userTz, true, true);
        targetTimezoneSelect.add(option);
        targetTimezoneSelect.value = userTz;
      }
    } catch (e) {
      targetTimezoneSelect.value = "UTC";
    }

    const now = new Date();
    dateTimeLocalInput.value = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}T${now
      .getHours()
      .toString()
      .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    convertBtn.addEventListener("click", () => {
      const localDateTimeValue = dateTimeLocalInput.value;
      const targetTimezone = targetTimezoneSelect.value;
      if (!localDateTimeValue) {
        outputP.textContent = "Please select a local date and time.";
        return;
      }
      try {
        const localDate = new Date(localDateTimeValue);
        const options = {
          timeZone: targetTimezone,
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZoneName: "short",
        };
        const formatter = new Intl.DateTimeFormat([], options);
        const convertedTime = formatter.format(localDate);
        outputP.textContent = `${convertedTime}`;
      } catch (e) {
        outputP.textContent = "Error converting time: " + e.message;
      }
    });
    convertBtn.click();
  }

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function initRegexTester() {
    const patternInput = document.getElementById("regex-pattern");
    const flagsInput = document.getElementById("regex-flags");
    const testStringInput = document.getElementById("regex-test-string");
    const testBtn = document.getElementById("regex-test-btn");
    const resultDiv = document.getElementById("regex-result");

    if (!patternInput) return; // Tool not present

    function highlightMatches(text, matches) {
      let lastIndex = 0;
      let highlightedText = "";
      matches.forEach((matchInfo) => {
        highlightedText += escapeHtml(
          text.substring(lastIndex, matchInfo.index)
        );
        highlightedText += `<mark class="bg-yellow-300 dark:bg-yellow-600 px-0.5 rounded">${escapeHtml(
          text.substring(
            matchInfo.index,
            matchInfo.index + matchInfo.value.length
          )
        )}</mark>`;
        lastIndex = matchInfo.index + matchInfo.value.length;
      });
      highlightedText += escapeHtml(text.substring(lastIndex));
      return highlightedText;
    }

    function testRegex() {
      const pattern = patternInput.value;
      const flags = flagsInput.value;
      const testString = testStringInput.value;
      resultDiv.innerHTML = "";
      if (!pattern) {
        resultDiv.innerHTML =
          '<p class="text-red-500 dark:text-red-400">Please enter a RegEx pattern.</p>';
        return;
      }
      try {
        const regex = new RegExp(pattern, flags);
        const allMatchesInfo = [];
        let match;
        if (regex.global) {
          while ((match = regex.exec(testString)) !== null) {
            allMatchesInfo.push({
              value: match[0],
              index: match.index,
              groups: match.groups ? { ...match.groups } : null,
            });
          }
        } else {
          match = regex.exec(testString);
          if (match) {
            allMatchesInfo.push({
              value: match[0],
              index: match.index,
              groups: match.groups ? { ...match.groups } : null,
            });
          }
        }
        if (allMatchesInfo.length > 0) {
          resultDiv.innerHTML = `<p class="mb-2"><strong>Matches found: ${allMatchesInfo.length}</strong></p>`;
          resultDiv.innerHTML += `<div class="mb-2 p-2 border rounded bg-gray-100 dark:bg-gray-700 whitespace-pre-wrap font-mono text-sm">${highlightMatches(
            testString,
            allMatchesInfo
          )}</div>`;
          allMatchesInfo.forEach((m, i) => {
            let matchDetail = `<p class="text-xs">Match ${
              i + 1
            }: <code class="bg-gray-200 dark:bg-gray-600 p-0.5 rounded">${escapeHtml(
              m.value
            )}</code> at index ${m.index}.</p>`;
            if (m.groups && Object.keys(m.groups).length > 0) {
              matchDetail += `<p class="text-xs ml-2">Groups: ${escapeHtml(
                JSON.stringify(m.groups)
              )}</p>`;
            }
            resultDiv.innerHTML += matchDetail;
          });
        } else {
          resultDiv.innerHTML = "<p>No matches found.</p>";
        }
      } catch (e) {
        resultDiv.innerHTML = `<p class="text-red-500 dark:text-red-400">Invalid RegEx: ${escapeHtml(
          e.message
        )}</p>`;
      }
    }
    testBtn.addEventListener("click", testRegex);
    [patternInput, flagsInput, testStringInput].forEach((el) =>
      el.addEventListener("input", testRegex)
    );
  }

  function initNetworkTools() {
    const clientIpEl = document.getElementById("nt-client-ip");
    const ipLocationEl = document.getElementById("nt-ip-location");
    const ipLookupInput = document.getElementById("nt-ip-lookup-input");
    const ipLookupBtn = document.getElementById("nt-ip-lookup-btn");
    const ipLookupResultEl = document.getElementById("nt-ip-lookup-result");
    const dnsInput = document.getElementById("nt-dns-input");
    const dnsRecordTypeSelect = document.getElementById("nt-dns-record-type");
    const dnsLookupBtn = document.getElementById("nt-dns-lookup-btn");
    const dnsResultEl = document.getElementById("nt-dns-result");

    if (!clientIpEl) return; // Tool not present

    async function fetchClientIpInfo() {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        clientIpEl.value = data.ip || "N/A";
        ipLocationEl.value = `${data.city || ""}, ${data.region || ""}, ${
          data.country_name || ""
        } (ISP: ${data.org || "N/A"})`;
      } catch (error) {
        console.error("Error fetching client IP info:", error);
        clientIpEl.value = "Error";
        ipLocationEl.value = "Could not fetch location data.";
      }
    }
    fetchClientIpInfo();

    ipLookupBtn.addEventListener("click", async () => {
      const query = ipLookupInput.value.trim();
      if (!query) {
        ipLookupResultEl.innerHTML =
          '<p class="text-red-500 dark:text-red-400">Please enter an IP address or domain.</p>';
        return;
      }
      ipLookupResultEl.innerHTML = "<p>Looking up...</p>";
      try {
        const response = await fetch(
          `https://ipapi.co/${encodeURIComponent(query)}/json/`
        );
        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: true, reason: "Unknown error" }));
          throw new Error(
            errorData.reason || `HTTP error! Status: ${response.status}`
          );
        }
        const data = await response.json();
        if (data.error) {
          ipLookupResultEl.innerHTML = `<p class="text-red-500 dark:text-red-400">${data.reason}</p>`;
        } else {
          let html = `<strong>IP:</strong> ${data.ip}<br>`;
          html += `<strong>Hostname:</strong> ${data.hostname || "N/A"}<br>`;
          html += `<strong>City:</strong> ${data.city || "N/A"}<br>`;
          html += `<strong>Region:</strong> ${data.region || "N/A"}<br>`;
          html += `<strong>Country:</strong> ${data.country_name || "N/A"} (${
            data.country_code || ""
          })<br>`;
          html += `<strong>Continent:</strong> ${
            data.continent_code || "N/A"
          }<br>`;
          html += `<strong>Latitude:</strong> ${data.latitude || "N/A"}<br>`;
          html += `<strong>Longitude:</strong> ${data.longitude || "N/A"}<br>`;
          html += `<strong>Timezone:</strong> ${data.timezone || "N/A"}<br>`;
          html += `<strong>UTC Offset:</strong> ${
            data.utc_offset || "N/A"
          }<br>`;
          html += `<strong>ASN:</strong> ${data.asn || "N/A"}<br>`;
          html += `<strong>Organization:</strong> ${data.org || "N/A"}`;
          ipLookupResultEl.innerHTML = html;
        }
      } catch (error) {
        ipLookupResultEl.innerHTML = `<p class="text-red-500 dark:text-red-400">Error: ${error.message}</p>`;
      }
    });

    dnsLookupBtn.addEventListener("click", async () => {
      const domain = dnsInput.value.trim();
      const recordType = dnsRecordTypeSelect.value;
      if (!domain) {
        dnsResultEl.innerHTML =
          '<p class="text-red-500 dark:text-red-400">Please enter a domain name.</p>';
        return;
      }
      dnsResultEl.innerHTML = "<p>Querying DNS...</p>";
      try {
        const response = await fetch(
          `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(
            domain
          )}&type=${recordType}`,
          {
            headers: { accept: "application/dns-json" },
          }
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        if (data.Status !== 0) {
          // 0 is NOERROR
          dnsResultEl.innerHTML = `<p class="text-red-500 dark:text-red-400">DNS Query Failed (Status: ${data.Status})</p>`;
          return;
        }

        if (data.Answer && data.Answer.length > 0) {
          let html = `<strong>${recordType} Records for ${escapeHtml(
            domain
          )}:</strong><br>`;
          data.Answer.forEach((ans) => {
            html += `• ${escapeHtml(ans.data)} (TTL: ${ans.TTL})<br>`;
          });
          dnsResultEl.innerHTML = html;
        } else {
          dnsResultEl.innerHTML = `<p>No ${recordType} records found for ${escapeHtml(
            domain
          )}.</p>`;
        }
      } catch (error) {
        dnsResultEl.innerHTML = `<p class="text-red-500 dark:text-red-400">DNS Lookup Error: ${error.message}</p>`;
      }
    });
  }
});
