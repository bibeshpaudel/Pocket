document.addEventListener("DOMContentLoaded", function () {
  // --- UI Navigation and Interaction ---

  const allTools = [
    // --- Graphics Tools ---
    {
      id: "svgViewer",
      name: "SVG Viewer",
      category: "Graphics Tools",
      description: "Paste your SVG code to render and preview it instantly.",
      icon: '<i class="fas fa-shapes text-white text-xl"></i>',
      color: "graphics",
    },
    // --- Image Tools ---
    {
      id: "imageCompressor",
      name: "Image Compressor",
      category: "Image Tools",
      description: "Reduce image file sizes while balancing quality.",
      icon: '<i class="fas fa-compress-alt text-white text-xl"></i>',
      color: "image",
    },
    {
      id: "imageConverter",
      name: "Image Converter",
      category: "Image Tools",
      description: "Convert images between formats like JPG, PNG, and WebP.",
      icon: '<i class="fas fa-exchange-alt text-white text-xl"></i>',
      color: "image",
    },
    // --- Code Tools ---
    {
      id: "modelGenerator",
      name: "JSON/XML To Model",
      category: "Code Tools",
      description:
        "Generate model classes in C#, Python, Java, and more from JSON or XML data.",
      icon: '<i class="fas fa-cubes text-white text-xl"></i>',
      color: "code",
    },
    {
      id: "jsonFormatter",
      name: "JSON Formatter",
      category: "Code Tools",
      description: "Format, validate, and inspect JSON data in a tree view.",
      icon: '<i class="fas fa-code text-white text-xl"></i>',
      color: "code",
    },
    {
      id: "xmlFormatter",
      name: "XML Formatter",
      category: "Code Tools",
      description:
        "Beautify and explore XML data with a collapsible tree view.",
      icon: '<i class="fas fa-file-code text-white text-xl"></i>',
      color: "code",
    },
    {
      id: "syntaxHighlighter",
      name: "Syntax Highlighter",
      category: "Code Tools",
      description:
        "Apply syntax highlighting to code snippets in various languages.",
      icon: '<i class="fas fa-star-of-life text-white text-xl"></i>',
      color: "code",
    },
    {
      id: "hashGenerator",
      name: "Hash Generator",
      category: "Code Tools",
      description: "Generate hashes (SHA-1, SHA-256, SHA-512) from text input.",
      icon: '<i class="fas fa-hashtag text-white text-xl"></i>',
      color: "code",
    },
    {
      id: "aesEncrypt",
      name: "AES Encrypt/Decrypt",
      category: "Code Tools",
      description: "Encrypt and decrypt text using AES with a password.",
      icon: '<i class="fas fa-shield-halved text-white text-xl"></i>',
      color: "code",
    },
    // --- Text Tools ---
    {
      id: "textCompare",
      name: "Text Comparison",
      category: "Text Tools",
      description:
        "Compare two texts and highlight the character-wise differences.",
      icon: '<i class="fas fa-columns text-white text-xl"></i>',
      color: "text",
    },
    {
      id: "base64Converter",
      name: "Base64 Converter",
      category: "Text Tools",
      description: "Encode text to Base64 or decode a Base64 string.",
      icon: '<i class="fas fa-lock text-white text-xl"></i>',
      color: "text",
    },
    {
      id: "urlEncoder",
      name: "URL Encoder/Decoder",
      category: "Text Tools",
      description: "Encode or decode strings for safe use in URLs.",
      icon: '<i class="fas fa-link text-white text-xl"></i>',
      color: "text",
    },
    {
      id: "markdownPreview",
      name: "Markdown Previewer",
      category: "Text Tools",
      description: "Write Markdown and see the rendered HTML in real-time.",
      icon: '<i class="fab fa-markdown text-white text-xl"></i>',
      color: "text",
    },
    {
      id: "caseConverter",
      name: "Text Case Converter",
      category: "Text Tools",
      description:
        "Convert text between various case styles (camelCase, snake_case, etc.).",
      icon: '<i class="fas fa-text-height text-white text-xl"></i>',
      color: "text",
    },
    {
      id: "wordCounter",
      name: "Word Counter",
      category: "Text Tools",
      description:
        "Count words, characters, sentences, and paragraphs in your text.",
      icon: '<i class="fas fa-calculator text-white text-xl"></i>',
      color: "text",
    },
    {
      id: "loremIpsum",
      name: "Lorem Ipsum Generator",
      category: "Text Tools",
      description: "Generate customizable placeholder text.",
      icon: '<i class="fas fa-paragraph text-white text-xl"></i>',
      color: "text",
    },
    // --- Generators ---
    {
      id: "qrGenerator",
      name: "QR Code Generator",
      category: "Generators",
      description: "Create custom QR codes for URLs, text, and more.",
      icon: '<i class="fas fa-qrcode text-white text-xl"></i>',
      color: "generators",
    },
    {
      id: "uuidGenerator",
      name: "UUID Generator",
      category: "Generators",
      description: "Generate universally unique identifiers (UUIDs).",
      icon: '<i class="fas fa-fingerprint text-white text-xl"></i>',
      color: "generators",
    },
    {
      id: "passwordGenerator",
      name: "Password Generator",
      category: "Generators",
      description: "Create strong, secure passwords with customizable options.",
      icon: '<i class="fas fa-key text-white text-xl"></i>',
      color: "generators",
    },
    // --- Converters ---
    {
      id: "unitConverter",
      name: "Unit Converter",
      category: "Converters",
      description: "Convert between units of length, weight, and temperature.",
      icon: '<i class="fas fa-balance-scale text-white text-xl"></i>',
      color: "converters",
    },
    {
      id: "timestampConverter",
      name: "Timestamp Converter",
      category: "Converters",
      description:
        "Convert Unix timestamps to human-readable dates and vice-versa.",
      icon: '<i class="fas fa-clock text-white text-xl"></i>',
      color: "converters",
    },
    {
      id: "timezoneConverter",
      name: "Timezone Converter",
      category: "Converters",
      description: "Convert dates and times between different timezones.",
      icon: '<i class="fas fa-globe text-white text-xl"></i>',
      color: "converters",
    },
    // --- Testing Tools ---
    {
      id: "regexTester",
      name: "RegEx Tester",
      category: "Testing Tools",
      description: "Test and debug regular expressions against a sample text.",
      icon: '<i class="fas fa-search-plus text-white text-xl"></i>',
      color: "testing",
    },
    // --- Network Tools ---
    {
      id: "ipLookup",
      name: "IP/DNS Lookup",
      category: "Network Tools",
      description: "Look up IP address information and perform DNS queries.",
      icon: '<i class="fas fa-map-marker-alt text-white text-xl"></i>',
      color: "network",
    },
  ];

  const defaultView = document.getElementById("default-view");
  const toolContainers = document.getElementById("tool-containers");

  function showTool(toolId) {
    if (!toolId || !document.getElementById(toolId)) {
      console.warn(`Tool with ID "${toolId}" not found. Returning home.`);
      returnHome();
      return;
    }
    defaultView.classList.add("hidden");
    toolContainers.classList.remove("hidden");
    document.querySelectorAll(".tool-container").forEach((container) => {
      container.classList.remove("active");
    });
    document.getElementById(toolId).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function returnHome() {
    toolContainers.classList.add("hidden");
    defaultView.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleCategory(categoryId) {
    const toolsDiv = document.getElementById(`${categoryId}-tools`);
    const arrowIcon = document.getElementById(`${categoryId}-arrow`);
    if (toolsDiv && arrowIcon) {
      toolsDiv.classList.toggle("hidden");
      arrowIcon.classList.toggle("rotate-180");
    }
  }

  // Event Listeners for sidebar and featured cards
  document
    .getElementById("sidebar-tool-list")
    .addEventListener("click", function (e) {
      const toolEl = e.target.closest("[data-tool]");
      const categoryToggleEl = e.target.closest("[data-category-toggle]");

      if (toolEl) {
        const toolId = toolEl.dataset.tool;
        showTool(toolId);
      } else if (categoryToggleEl) {
        const categoryId = categoryToggleEl.dataset.categoryToggle;
        toggleCategory(categoryId);
      }
    });

  defaultView.addEventListener("click", function (e) {
    const toolCard = e.target.closest(".tool-card");
    if (toolCard) {
      const toolId = toolCard.dataset.tool;
      showTool(toolId);
    }
  });

  document.querySelectorAll(".return-home-btn").forEach((btn) => {
    btn.addEventListener("click", returnHome);
  });

  // Search functionality
  const toolSearchInput = document.getElementById("toolSearchInput");
  toolSearchInput.addEventListener("input", () => {
    const searchTerm = toolSearchInput.value.toLowerCase().trim();
    document
      .querySelectorAll("#sidebar-tool-list .sidebar-item")
      .forEach((categoryDiv) => {
        let categoryHasVisibleItem = false;
        categoryDiv.querySelectorAll("[data-tool]").forEach((toolDiv) => {
          const toolName = toolDiv
            .querySelector("span:last-child")
            .textContent.toLowerCase();
          const isVisible = toolName.includes(searchTerm);
          toolDiv.style.display = isVisible ? "flex" : "none";
          if (isVisible) categoryHasVisibleItem = true;
        });
        categoryDiv.style.display =
          categoryHasVisibleItem || searchTerm === "" ? "block" : "none";
      });
  });

  // Expand/Collapse All
  const expandBtn = document.getElementById("expand-all-btn");
  const collapseBtn = document.getElementById("collapse-all-btn");
  const controlAll = (shouldExpand) => {
    document.querySelectorAll("[data-category-toggle]").forEach((el) => {
      const categoryId = el.dataset.categoryToggle;
      const toolsDiv = document.getElementById(`${categoryId}-tools`);
      const arrowIcon = document.getElementById(`${categoryId}-arrow`);
      if (toolsDiv && arrowIcon) {
        toolsDiv.classList.toggle("hidden", !shouldExpand);
        arrowIcon.classList.toggle("rotate-180", shouldExpand);
      }
    });
  };
  expandBtn.addEventListener("click", () => controlAll(true));
  collapseBtn.addEventListener("click", () => controlAll(false));

  // --- Core Tool Logic (from index.html, adapted for new UI) ---
  Prism.plugins.autoloader.languages_path =
    "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/";

  // --- Helper Functions ---
  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " bytes";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  }

  function showStatus(elementId, message, isError = false) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = message;
      el.className = `text-sm h-5 ${
        isError ? "text-red-400" : "text-green-400"
      }`;
    }
  }

  function genericCopy(textToCopy, buttonElement) {
    if (!textToCopy) return;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        const originalContent = buttonElement.innerHTML;
        buttonElement.innerHTML = "Copied!";
        setTimeout(() => {
          buttonElement.innerHTML = originalContent;
        }, 1500);
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  }

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function copyToClipboard(element, button) {
    navigator.clipboard.writeText(element.textContent).then(() => {
      const originalText = button.textContent;
      button.textContent = "Copied!";
      setTimeout(() => (button.textContent = originalText), 1500);
    });
  }

  let pinnedToolIds = [];
  function initPinningSystem() {
    const customizeBtn = document.getElementById("customize-pins-btn");
    const saveBtn = document.getElementById("save-pins-btn");
    const modal = document.getElementById("pin-modal");
    const modalList = document.getElementById("pin-modal-tool-list");
    const closeBtns = [
      document.getElementById("close-pin-modal-btn"),
      document.getElementById("cancel-pin-changes-btn"),
    ];

    // 1. Load pins from localStorage or set defaults
    loadPins();

    // 2. Render the initial dashboard
    renderDashboard();

    // 3. Setup Modal
    customizeBtn.addEventListener("click", openPinModal);
    closeBtns.forEach((btn) =>
      btn.addEventListener("click", () => modal.classList.add("hidden"))
    );
    saveBtn.addEventListener("click", savePinChanges);

    function loadPins() {
      const savedPins = localStorage.getItem("pinnedTools");
      const defaultPins = [
        "modelGenerator",
        "jsonFormatter",
        "xmlFormatter",
        "base64Converter",
        "textCompare",
        "hashGenerator",
      ];

      if (savedPins) {
        pinnedToolIds = JSON.parse(savedPins);
        // If the user has unpinned everything, reset to the default set.
        if (pinnedToolIds.length === 0) {
          pinnedToolIds = defaultPins;
        }
      } else {
        // This is for the very first visit.
        pinnedToolIds = defaultPins;
      }
    }

    function savePins() {
      localStorage.setItem("pinnedTools", JSON.stringify(pinnedToolIds));
    }

    function renderDashboard() {
      const grid = document.getElementById("featured-tools-grid");
      grid.innerHTML = "";
      if (pinnedToolIds.length === 0) {
        grid.innerHTML = `<p class="text-gray-400 md:col-span-2 lg:col-span-3 text-center">No tools pinned. Click 'Customize' to add some!</p>`;
      }
      pinnedToolIds.forEach((id) => {
        const tool = allTools.find((t) => t.id === id);
        if (tool) {
          grid.innerHTML += createToolCardHTML(tool);
        }
      });
      // Add event listeners to new unpin buttons
      document.querySelectorAll(".unpin-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation(); // prevent card click
          const toolId = e.currentTarget.dataset.toolId;
          unpinTool(toolId);
        });
      });
    }

    function createToolCardHTML(tool) {
      return `
                    <div class="tool-card bg-dark-card rounded-xl p-6 cursor-pointer" data-tool="${tool.id}">
                        <button class="unpin-btn" data-tool-id="${tool.id}" title="Unpin Tool">
                            <i class="fas fa-thumbtack"></i>
                        </button>
                        <div class="flex items-center mb-4">
                            <div class="bg-${tool.color} p-3 rounded-xl mr-4">${tool.icon}</div>
                            <h3 class="text-xl font-semibold">${tool.name}</h3>
                        </div>
                        <p class="text-gray-400 mb-4">${tool.description}</p>
                        <div class="bg-${tool.color} bg-opacity-10 text-${tool.color} px-3 py-1 rounded-full text-xs inline-block">${tool.category}</div>
                    </div>`;
    }

    function openPinModal() {
      modalList.innerHTML = "";
      allTools.forEach((tool) => {
        const isPinned = pinnedToolIds.includes(tool.id);
        modalList.innerHTML += `
                        <label class="flex items-center p-3 pin-modal-item hover:bg-gray-800 rounded-lg cursor-pointer">
                            <input type="checkbox" data-tool-id="${
                              tool.id
                            }" class="h-5 w-5 mr-4" ${
          isPinned ? "checked" : ""
        }>
                            <div class="bg-${tool.color} p-2 rounded-lg mr-3">${
          tool.icon
        }</div>
                            <div>
                                <span class="font-medium">${tool.name}</span>
                                <p class="text-sm text-gray-400">${
                                  tool.category
                                }</p>
                            </div>
                        </label>`;
      });
      modal.classList.remove("hidden");
    }

    function savePinChanges() {
      const newPinnedIds = [];
      modalList
        .querySelectorAll('input[type="checkbox"]:checked')
        .forEach((checkbox) => {
          newPinnedIds.push(checkbox.dataset.toolId);
        });
      pinnedToolIds = newPinnedIds;
      savePins();
      renderDashboard();
      modal.classList.add("hidden");
    }

    function unpinTool(toolId) {
      pinnedToolIds = pinnedToolIds.filter((id) => id !== toolId);
      savePins();
      renderDashboard();
    }
  }

  // --- Tool Initializations ---
  function initAllTools() {
    initSvgViewer();
    initImageCompressor();
    initImageConverter();
    initModelGenerator();
    initJsonFormatter();
    initXmlFormatter();
    initSyntaxHighlighter();
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
    initTimestampConverter();
    initTimezoneConverter();
    initRegexTester();
    initNetworkTools();
  }
  initAllTools();
  initPinningSystem();

  // --- Tool Implementations ---
  function initSvgViewer() {
    const inputEl = document.getElementById("svgInput");
    const previewArea = document.getElementById("svgPreview");
    const renderBtn = document.getElementById("svgRenderBtn");

    function renderSVG() {
      const svgCode = inputEl.value;
      const sanitizedCode = svgCode.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ""
      );
      previewArea.innerHTML = sanitizedCode;
      if (!previewArea.querySelector("svg") && sanitizedCode.trim()) {
        previewArea.innerHTML =
          '<p class="text-red-400">Invalid or empty SVG code.</p>';
      } else if (!sanitizedCode.trim()) {
        previewArea.innerHTML =
          '<p class="text-gray-500">SVG preview will appear here</p>';
      }
    }
    renderBtn.addEventListener("click", renderSVG);
    inputEl.addEventListener("input", renderSVG);
  }

  function initImageCompressor() {
    const uploadArea = document.getElementById("ic-upload-area");
    const imageUpload = document.getElementById("imageUpload");
    const selectImgBtn = document.getElementById("selectImgBtn");
    const originalPreview = document.getElementById("originalPreview");
    const originalSize = document.getElementById("originalSize");
    const qualitySlider = document.getElementById("compressionQuality");
    const qualityValue = document.getElementById("qualityValue");
    const compressBtn = document.getElementById("compressBtn");
    const compressedPreview = document.getElementById("compressedPreview");
    const compressedSize = document.getElementById("compressedSize");
    const downloadBtn = document.getElementById("downloadBtn");
    let originalFile = null;

    uploadArea.addEventListener("click", () => imageUpload.click());
    //selectImgBtn.addEventListener("click", () => imageUpload.click());
    qualitySlider.addEventListener(
      "input",
      () => (qualityValue.textContent = qualitySlider.value)
    );

    imageUpload.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith("image/")) return;
      originalFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        originalPreview.src = e.target.result;
        originalSize.textContent = `${formatFileSize(originalFile.size)}`;
        compressBtn.disabled = false;
        compressBtn.classList.remove("opacity-50", "cursor-not-allowed");
      };
      reader.readAsDataURL(file);
    });

    compressBtn.addEventListener("click", () => {
      if (!originalFile) return;
      const quality = parseInt(qualitySlider.value) / 100;
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              compressedPreview.src = URL.createObjectURL(blob);
              compressedSize.textContent = `${formatFileSize(blob.size)}`;
              downloadBtn.href = URL.createObjectURL(blob);
              downloadBtn.download = `compressed-${originalFile.name}`;
              downloadBtn.disabled = false;
              downloadBtn.classList.remove("opacity-50", "cursor-not-allowed");
              downloadBtn.classList.remove("bg-image");
              downloadBtn.classList.add("bg-purple-600");
            },
            originalFile.type,
            quality
          );
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(originalFile);
    });
  }

  function initImageConverter() {
    const uploadArea = document.getElementById("iconv-upload-area");
    const imageUpload = document.getElementById("iconvImageUpload");
    const selectImgBtn = document.getElementById("iconvSelectImageBtn");
    const previewImg = document.getElementById("iconvPreview");
    const outputFormatSelect = document.getElementById("iconvOutputFormat");
    const convertBtn = document.getElementById("iconvConvertBtn");
    const downloadLink = document.getElementById("iconvDownloadLink");
    const statusEl = document.getElementById("iconvStatus");
    let originalImageFile = null;

    uploadArea.addEventListener("click", () => imageUpload.click());
    //selectImgBtn.addEventListener("click", () => imageUpload.click());

    imageUpload.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith("image/")) return;
      originalImageFile = file;
      previewImg.src = URL.createObjectURL(file);
      convertBtn.disabled = false;
      convertBtn.classList.remove("opacity-50", "cursor-not-allowed");
      statusEl.textContent = `Original: ${formatFileSize(file.size)}`;
    });

    convertBtn.addEventListener("click", () => {
      if (!originalImageFile) return;

      const format = outputFormatSelect.value;
      const mimeType = `image/${format}`;
      statusEl.textContent = "Converting...";

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              downloadLink.href = url;
              downloadLink.download = `converted_${Date.now()}.${
                format === "jpeg" ? "jpg" : format
              }`;
              downloadLink.classList.remove("hidden");
              statusEl.textContent = `Converted: ${format.toUpperCase()} (${formatFileSize(
                blob.size
              )})`;
            } else {
              statusEl.textContent = `Conversion to ${format.toUpperCase()} failed.`;
            }
          },
          mimeType,
          0.9
        ); // Quality for JPG/WEBP
      };
      img.src = URL.createObjectURL(originalImageFile);
    });
  }

  function initModelGenerator() {
    const inputEl = document.getElementById("model-input");
    const outputEl = document.getElementById("model-output");
    const generateBtn = document.getElementById("model-generate-btn");
    const copyBtn = document.getElementById("model-copy-btn");
    const statusEl = document.getElementById("model-status");
    const languageSelect = document.getElementById("model-language");

    const languages = {
      csharp: { name: "C#", prism: "csharp" },
      typescript: { name: "TypeScript", prism: "typescript" },
      python: { name: "Python", prism: "python" },
      java: { name: "Java", prism: "java" },
      go: { name: "Go", prism: "go" },
      ruby: { name: "Ruby", prism: "ruby" },
      php: { name: "PHP", prism: "php" },
      rust: { name: "Rust", prism: "rust" },
      swift: { name: "Swift", prism: "swift" },
      kotlin: { name: "Kotlin", prism: "kotlin" },
      dart: { name: "Dart", prism: "dart" },
      scala: { name: "Scala", prism: "scala" },
      r: { name: "R", prism: "r" },
      perl: { name: "Perl", prism: "perl" },
      elixir: { name: "Elixir", prism: "elixir" },
      haskell: { name: "Haskell", prism: "haskell" },
      javascript: { name: "JavaScript", prism: "javascript" },
    };

    Object.keys(languages).forEach((key) => {
      const option = new Option(languages[key].name, key);
      if (key === "csharp") option.selected = true;
      languageSelect.appendChild(option);
    });

    copyBtn.addEventListener("click", () => copyToClipboard(outputEl, copyBtn));

    generateBtn.addEventListener("click", () => {
      const input = inputEl.value.trim();
      if (!input) {
        showStatus(statusEl, "Input cannot be empty.", true);
        return;
      }
      const langKey = languageSelect.value;
      const typeStrategy = document.querySelector(
        'input[name="type-strategy"]:checked'
      ).value;

      let inputType;
      let code = "";

      try {
        JSON.parse(input);
        inputType = "json";
        code = generateCodeFromJson(input, langKey, typeStrategy);
      } catch (e) {
        try {
          const xmlDoc = new DOMParser().parseFromString(
            input,
            "application/xml"
          );
          if (xmlDoc.querySelector("parsererror")) throw new Error();
          inputType = "xml";
          code = generateCodeFromXml(xmlDoc, langKey, typeStrategy);
        } catch (e2) {
          outputEl.textContent = "";
          Prism.highlightElement(outputEl);
          showStatus(statusEl, "Input is not valid JSON or XML.", true);
          return;
        }
      }

      outputEl.textContent = code;
      outputEl.className = `language-${languages[langKey].prism}`;
      Prism.highlightElement(outputEl);
      showStatus(
        statusEl,
        `${
          languages[langKey].name
        } models generated from ${inputType.toUpperCase()}.`
      );
    });

    const toPascal = (s) =>
      s.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
    const toSnake = (s) =>
      s
        .replace(/([A-Z])/g, "_$1")
        .toLowerCase()
        .replace(/^_/, "");
    const toCamel = (s) => s.replace(/^[A-Z]/, (l) => l.toLowerCase());

    function inferJsonType(value, lang, typeStrategy) {
      if (typeStrategy === "string")
        return (
          { csharp: "string", python: "str", java: "String" }[lang] || "string"
        );
      if (value === null)
        return { csharp: "object", python: "Any" }[lang] || "any";
      const type = typeof value;
      if (type === "string")
        return (
          { csharp: "string", python: "str", java: "String" }[lang] || "string"
        );
      if (type === "boolean")
        return (
          { csharp: "bool", python: "bool", java: "boolean" }[lang] || "bool"
        );
      if (type === "number")
        return Number.isInteger(value)
          ? { csharp: "int", python: "int", java: "Integer", go: "int64" }[
              lang
            ] || "int"
          : {
              csharp: "double",
              python: "float",
              java: "Double",
              go: "float64",
            }[lang] || "float";
      return "object";
    }

    function inferXmlType(text, lang, typeStrategy) {
      if (typeStrategy === "string") return "string";
      if (text === "true" || text === "false") return "bool";
      if (!isNaN(text) && text.trim() !== "") {
        if (text.includes(".")) return "double";
        return "int";
      }
      return "string";
    }

    function generateCodeFromJson(json, lang, typeStrategy) {
      const data = JSON.parse(json);
      let classes = new Map();
      const rootName = "Root";

      function buildClass(obj, name) {
        if (classes.has(name) || typeof obj !== "object" || obj === null)
          return;
        let props = new Map();
        for (const key in obj) {
          const value = obj[key];
          let typeName, arrayType;
          if (Array.isArray(value)) {
            const item = value.length > 0 ? value[0] : null;
            const childName = toPascal(key);
            arrayType =
              item !== null && typeof item === "object"
                ? childName
                : inferJsonType(item, lang, typeStrategy);
            if (item !== null && typeof item === "object")
              buildClass(item, childName);
            typeName =
              {
                csharp: `List<${arrayType}>`,
                python: `List[${arrayType}]`,
                java: `List<${arrayType}>`,
                go: `[]${arrayType}`,
                typescript: `${arrayType}[]`,
              }[lang] || `List<${arrayType}>`;
          } else if (typeof value === "object" && value !== null) {
            typeName = toPascal(key);
            buildClass(value, typeName);
          } else {
            typeName = inferJsonType(value, lang, typeStrategy);
          }
          props.set(key, {
            name: toPascal(key),
            type: typeName,
            original: key,
          });
        }
        classes.set(name, { props: Array.from(props.values()) });
      }

      buildClass(data, rootName);

      let code = "";
      if (lang === "csharp")
        code += "using System.Text.Json.Serialization;\n\n";

      classes.forEach((classData, className) => {
        let propsString = "";
        classData.props.forEach((p) => {
          propsString += `    [JsonPropertyName("${p.original}")]\n    public ${p.type} ${p.name} { get; set; }\n\n`;
        });
        code += `public class ${className}\n{\n${propsString.trimEnd()}\n}\n\n`;
      });
      return code.trim();
    }

    function generateCodeFromXml(xmlDoc, lang, typeStrategy) {
      if (lang !== "csharp")
        return "// XML to model is currently only supported for C#.";

      let classes = new Map();
      const rootName = toPascal(xmlDoc.documentElement.nodeName);

      function buildClass(element, className) {
        if (classes.has(className)) return;
        let props = [];

        if (element.attributes) {
          for (const attr of element.attributes) {
            const type = inferXmlType(attr.value, lang, typeStrategy);
            props.push(
              `    [XmlAttribute(AttributeName = "${
                attr.name
              }")]\n    public ${type} ${toPascal(attr.name)} { get; set; }\n`
            );
          }
        }

        const childCounts = {};
        for (const child of element.children) {
          childCounts[child.nodeName] = (childCounts[child.nodeName] || 0) + 1;
        }

        const processedChildren = new Set();
        for (const child of element.children) {
          if (processedChildren.has(child.nodeName)) continue;
          const propName = toPascal(child.nodeName);
          if (childCounts[child.nodeName] > 1) {
            buildClass(child, propName);
            props.push(
              `    [XmlElement(ElementName = "${child.nodeName}")]\n    public List<${propName}> ${propName} { get; set; }\n`
            );
          } else {
            if (child.children.length > 0 || child.attributes.length > 0) {
              buildClass(child, propName);
              props.push(
                `    [XmlElement(ElementName = "${child.nodeName}")]\n    public ${propName} ${propName} { get; set; }\n`
              );
            } else {
              const type = inferXmlType(child.textContent, lang, typeStrategy);
              props.push(
                `    [XmlElement(ElementName = "${child.nodeName}")]\n    public ${type} ${propName} { get; set; }\n`
              );
            }
          }
          processedChildren.add(child.nodeName);
        }

        const textNode = Array.from(element.childNodes).find(
          (n) => n.nodeType === 3 && n.textContent.trim()
        );
        if (textNode) {
          const type = inferXmlType(
            textNode.textContent.trim(),
            lang,
            typeStrategy
          );
          props.push(`    [XmlText]\n    public ${type} Text { get; set; }\n`);
        }

        classes.set(className, props);
      }

      buildClass(xmlDoc.documentElement, rootName);

      let code =
        "using System.Xml.Serialization;\nusing System.Collections.Generic;\n\n";
      for (const [name, props] of classes) {
        code += `[XmlRoot(ElementName = "${toSnake(name).replace(
          /_/g,
          "-"
        )}")]\n`; // A guess for root name
        code += `public class ${name}\n{\n${props.join("\n")}\n}\n\n`;
      }
      return code.trim();
    }
  }

  function initJsonFormatter() {
    const inputEl = document.getElementById("jsonInput");
    const outputCodeEl = document.getElementById("jsonOutput");
    const formatBtn = document.getElementById("jsonFormatBtn");
    const minifyBtn = document.getElementById("jsonMinifyBtn");
    const clearBtn = document.getElementById("jsonClearBtn");
    const statusEl = document.getElementById("jsonStatus");
    const treeViewContainer = document.getElementById("jsonTreeView");
    const showFormattedBtn = document.getElementById("json-show-formatted-btn");
    const showTreeBtn = document.getElementById("json-show-tree-btn");
    const preOutputView = document.getElementById("json-output-pre");

    function toggleView(showTree) {
      preOutputView.classList.toggle("hidden", showTree);
      treeViewContainer.classList.toggle("hidden", !showTree);
      showFormattedBtn.style.backgroundColor = showTree ? "" : "#FFD166";
      showFormattedBtn.style.color = showTree ? "" : "black";
      showTreeBtn.style.backgroundColor = showTree ? "#FFD116" : "";
      showTreeBtn.style.color = showTree ? "black" : "";
    }

    showFormattedBtn.addEventListener("click", () => toggleView(false));
    showTreeBtn.addEventListener("click", () => toggleView(true));
    toggleView(false); // Default to formatted text

    function buildJsonTree(data, parentElement) {
      parentElement.innerHTML = "";
      const ul = document.createElement("ul");
      ul.className = "tree-view";
      const items = Array.isArray(data) ? data.entries() : Object.entries(data);

      for (const [key, value] of items) {
        const li = document.createElement("li");
        const keySpan = document.createElement("span");
        keySpan.className = "tree-key";
        keySpan.textContent = Array.isArray(data) ? `[${key}]: ` : `"${key}": `;

        if (typeof value === "object" && value !== null) {
          li.className = "tree-node collapsed";
          const toggler = document.createElement("span");
          toggler.className = "tree-toggler";
          toggler.textContent = "▸";
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
          const valueSpan = document.createElement("span");
          if (typeof value === "string") {
            valueSpan.className = "tree-value-string";
            valueSpan.textContent = `"${value}"`;
          } else if (typeof value === "number") {
            valueSpan.className = "tree-value-number";
            valueSpan.textContent = value;
          } else if (typeof value === "boolean") {
            valueSpan.className = "tree-value-boolean";
            valueSpan.textContent = value;
          } else {
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
        outputCodeEl.textContent = JSON.stringify(
          jsonObj,
          null,
          minify ? 0 : 2
        );
        Prism.highlightElement(outputCodeEl);
        buildJsonTree(jsonObj, treeViewContainer);
        showStatus(statusEl, minify ? "JSON minified!" : "JSON formatted!");
      } catch (e) {
        outputCodeEl.textContent = "";
        Prism.highlightElement(outputCodeEl);
        treeViewContainer.innerHTML = `<p class="text-red-400">${e.message}</p>`;
        showStatus(statusEl, "Invalid JSON: " + e.message, true);
      }
    }

    formatBtn.addEventListener("click", () => processJson(false));
    minifyBtn.addEventListener("click", () => processJson(true));
    clearBtn.addEventListener("click", () => {
      inputEl.value = "";
      outputCodeEl.textContent = "";
      treeViewContainer.innerHTML = "";
      Prism.highlightElement(outputCodeEl);
      showStatus(statusEl, "");
    });
  }

  function initXmlFormatter() {
    const inputEl = document.getElementById("xmlInput");
    const outputCodeEl = document.getElementById("xmlOutput");
    const formatBtn = document.getElementById("xmlFormatBtn");
    const clearBtn = document.getElementById("xmlClearBtn");
    const statusEl = document.getElementById("xmlStatus");
    const treeViewContainer = document.getElementById("xmlTreeView");
    const showFormattedBtn = document.getElementById("xml-show-formatted-btn");
    const showTreeBtn = document.getElementById("xml-show-tree-btn");
    const preOutputView = document.getElementById("xml-output-pre");

    function toggleView(showTree) {
      preOutputView.classList.toggle("hidden", showTree);
      treeViewContainer.classList.toggle("hidden", !showTree);
      showFormattedBtn.style.backgroundColor = showTree ? "" : "#FFD166";
      showFormattedBtn.style.color = showTree ? "" : "black";
      showTreeBtn.style.backgroundColor = showTree ? "#FFD166" : "";
      showTreeBtn.style.color = showTree ? "black" : "";
    }

    showFormattedBtn.addEventListener("click", () => toggleView(false));
    showTreeBtn.addEventListener("click", () => toggleView(true));
    toggleView(false); // Default view

    function buildXmlTree(xmlNode, parentElement) {
      const li = document.createElement("li");
      const nodeContainer = document.createElement("div");

      const tagSpan = document.createElement("span");
      tagSpan.className = "xml-tag";
      tagSpan.textContent = `<${xmlNode.nodeName}`;
      nodeContainer.appendChild(tagSpan);

      if (xmlNode.attributes) {
        for (const attr of xmlNode.attributes) {
          const attrNameSpan = document.createElement("span");
          attrNameSpan.className = "xml-attribute-name";
          attrNameSpan.textContent = `${attr.name}`;
          nodeContainer.appendChild(attrNameSpan);
          nodeContainer.append(`="`);
          const attrValSpan = document.createElement("span");
          attrValSpan.className = "xml-attribute-value";
          attrValSpan.textContent = `${attr.value}`;
          nodeContainer.appendChild(attrValSpan);
          nodeContainer.append(`"`);
        }
      }

      const elementChildren = Array.from(xmlNode.children);
      const textChildren = Array.from(xmlNode.childNodes).filter(
        (n) => n.nodeType === Node.TEXT_NODE && n.nodeValue.trim()
      );

      if (elementChildren.length === 0 && textChildren.length === 0) {
        tagSpan.textContent += ` />`;
        li.appendChild(nodeContainer);
      } else {
        tagSpan.textContent += `>`;
        li.className = "tree-node collapsed";
        const toggler = document.createElement("span");
        toggler.className = "tree-toggler";
        toggler.textContent = "▸";
        li.appendChild(toggler);
        li.appendChild(nodeContainer);

        const childUl = document.createElement("ul");
        textChildren.forEach((child) => {
          const textLi = document.createElement("li");
          textLi.style.cssText = "list-style-type: none; margin-left: -1em;";
          const textSpan = document.createElement("span");
          textSpan.className = "xml-text-node";
          textSpan.textContent = child.nodeValue.trim();
          textLi.appendChild(textSpan);
          childUl.appendChild(textLi);
        });
        elementChildren.forEach((child) => buildXmlTree(child, childUl));
        li.appendChild(childUl);

        const closingTag = document.createElement("span");
        closingTag.className = "xml-tag";
        closingTag.textContent = `</${xmlNode.nodeName}>`;
        li.appendChild(closingTag);

        toggler.onclick = (e) => {
          e.stopPropagation();
          li.classList.toggle("collapsed");
          toggler.textContent = li.classList.contains("collapsed") ? "▸" : "▾";
        };
      }
      parentElement.appendChild(li);
    }

    function processXml() {
      const xmlString = inputEl.value;
      if (!xmlString.trim()) {
        showStatus(statusEl, "Input is empty.", true);
        return;
      }
      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "application/xml");
        const parseError = xmlDoc.querySelector("parsererror");
        if (parseError) throw new Error(parseError.textContent.split("\n")[0]);

        outputCodeEl.textContent = html_beautify(xmlString, {
          indent_size: 2,
          unformatted: [],
        });
        Prism.highlightElement(outputCodeEl);

        treeViewContainer.innerHTML = "";
        const rootUl = document.createElement("ul");
        rootUl.className = "tree-view";
        buildXmlTree(xmlDoc.documentElement, rootUl);
        treeViewContainer.appendChild(rootUl);

        showStatus(statusEl, "XML processed successfully!");
      } catch (e) {
        outputCodeEl.textContent = "";
        Prism.highlightElement(outputCodeEl);
        treeViewContainer.innerHTML = `<p class="text-red-400">${e.message}</p>`;
        showStatus(statusEl, "Invalid XML: " + e.message, true);
      }
    }

    formatBtn.addEventListener("click", processXml);
    clearBtn.addEventListener("click", () => {
      inputEl.value = "";
      outputCodeEl.textContent = "";
      treeViewContainer.innerHTML = "";
      Prism.highlightElement(outputCodeEl);
      showStatus(statusEl, "");
    });
  }

  function initSyntaxHighlighter() {
    const languageSelect = document.getElementById("sh-language");
    const inputArea = document.getElementById("sh-input");
    const outputCode = document.getElementById("sh-output-code");

    function highlight() {
      const code = inputArea.value;
      const language = languageSelect.value;
      outputCode.textContent = code;
      outputCode.className = `language-${language}`;
      outputCode.parentElement.className = `syntax-highlight language-${language}`;
      Prism.highlightElement(outputCode);
    }
    inputArea.addEventListener("input", highlight);
    languageSelect.addEventListener("change", highlight);
    highlight(); // Initial call
  }

  function initHashGenerator() {
    const inputEl = document.getElementById("hash-input");
    const algoSelect = document.getElementById("hash-algorithm");
    const generateBtn = document.getElementById("hash-generate-btn");
    const outputEl = document.getElementById("hash-output");

    generateBtn.addEventListener("click", async () => {
      const text = inputEl.value;
      if (!text) return;
      try {
        const data = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest(algoSelect.value, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        outputEl.value = hashArray
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
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

    async function getKey(password, salt) {
      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
      );
      return crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
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
        const encodedPlaintext = new TextEncoder().encode(plaintext);
        const ciphertextBuffer = await crypto.subtle.encrypt(
          { name: "AES-GCM", iv },
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
            "Ciphertext and password are required.",
            true
          );
          return;
        }
        const combined = Uint8Array.from(atob(base64Input), (c) =>
          c.charCodeAt(0)
        );
        if (combined.length < 28) throw new Error("Ciphertext is too short.");
        const salt = combined.slice(0, 16);
        const iv = combined.slice(16, 28);
        const ciphertext = combined.slice(28);
        const key = await getKey(password, salt);
        const decryptedBuffer = await crypto.subtle.decrypt(
          { name: "AES-GCM", iv },
          key,
          ciphertext
        );
        outputArea.value = new TextDecoder().decode(decryptedBuffer);
        showStatus("aes-status", "Decryption successful.");
      } catch (e) {
        outputArea.value = "";
        showStatus("aes-status", "Decryption failed: " + e.message, true);
      }
    });
  }

  function initTextComparison() {
    const input1El = document.getElementById("text-compare-input1");
    const input2El = document.getElementById("text-compare-input2");
    const resultLeftEl = document.getElementById("text-compare-result-left");
    const resultRightEl = document.getElementById("text-compare-result-right");
    const modeContainer =
      document.querySelector(".diff-mode-btn").parentElement;
    let currentDiffMode = "word";

    function runComparison() {
      const text1 = input1El.value;
      const text2 = input2El.value;

      let diffFunction;
      if (currentDiffMode === "line") diffFunction = Diff.diffLines;
      else if (currentDiffMode === "char") diffFunction = Diff.diffChars;
      else diffFunction = Diff.diffWords;

      const diffs = diffFunction(text1, text2);
      let leftHtml = "";
      let rightHtml = "";

      diffs.forEach((part) => {
        const escapedValue = escapeHtml(part.value);
        if (part.added) {
          rightHtml += `<ins>${escapedValue}</ins>`;
        } else if (part.removed) {
          leftHtml += `<del>${escapedValue}</del>`;
        } else {
          leftHtml += `<span>${escapedValue}</span>`;
          rightHtml += `<span>${escapedValue}</span>`;
        }
      });

      resultLeftEl.innerHTML = leftHtml || " ";
      resultRightEl.innerHTML = rightHtml || " ";
    }

    modeContainer.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        modeContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        currentDiffMode = e.target.dataset.mode;
        runComparison();
      }
    });

    input1El.addEventListener("input", runComparison);
    input2El.addEventListener("input", runComparison);

    // Sync scrolling for all text areas in this tool
    const scrollElements = document.querySelectorAll(
      "#textCompare .sync-scroll"
    );
    scrollElements.forEach((el) => {
      el.addEventListener("scroll", () => {
        const scrollPos = el.scrollTop;
        scrollElements.forEach((otherEl) => {
          if (otherEl !== el) {
            otherEl.scrollTop = scrollPos;
          }
        });
      });
    });

    runComparison(); // Initial run
  }

  function initBase64Converter() {
    const inputEl = document.getElementById("base64Input");
    const outputEl = document.getElementById("base64Output");
    const encodeBtn = document.getElementById("encodeBase64Btn");
    const decodeBtn = document.getElementById("decodeBase64Btn");
    const statusEl = document.getElementById("base64Status");

    encodeBtn.addEventListener("click", () => {
      try {
        const utf8Bytes = new TextEncoder().encode(inputEl.value);
        const binaryString = String.fromCharCode(...utf8Bytes);
        outputEl.value = btoa(binaryString);
        showStatus("base64Status", "Encoded successfully!");
      } catch (e) {
        showStatus("base64Status", "Error encoding: " + e.message, true);
      }
    });

    decodeBtn.addEventListener("click", () => {
      try {
        const binaryString = atob(inputEl.value);
        const utf8Bytes = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
        outputEl.value = new TextDecoder().decode(utf8Bytes);
        showStatus("base64Status", "Decoded successfully!");
      } catch (e) {
        showStatus(
          "base64Status",
          "Error decoding: Invalid Base64 string.",
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

    encodeBtn.addEventListener("click", () => {
      try {
        outputEl.value = encodeURIComponent(inputEl.value);
        showStatus("url-status", "Encoded!");
      } catch (e) {
        showStatus("url-status", "Error encoding.", true);
      }
    });
    decodeBtn.addEventListener("click", () => {
      try {
        outputEl.value = decodeURIComponent(inputEl.value);
        showStatus("url-status", "Decoded!");
      } catch (e) {
        showStatus("url-status", "Error decoding: Malformed URI.", true);
      }
    });
  }

  function initMarkdownPreviewer() {
    const markdownInput = document.getElementById("markdownInput");
    const previewOutput = document.getElementById("markdownPreviewOutput");
    const defaultMarkdown = `# Welcome to Pocket Tools\n## Markdown Previewer\n\n**This is bold text**  \n*This is italic text*\n\n### Features:\n- Real-time preview\n- Supports GFM\n\n\`\`\`javascript\nfunction hello() {\n  console.log("Hello, world!");\n}\n\`\`\``;

    marked.setOptions({
      breaks: true,
      gfm: true,
      highlight: (code, lang) => {
        const language = Prism.languages[lang] || Prism.languages.markup;
        return Prism.highlight(code, language, lang);
      },
    });

    function renderMarkdown() {
      previewOutput.innerHTML = marked.parse(markdownInput.value);
    }
    markdownInput.value = defaultMarkdown;
    markdownInput.addEventListener("input", renderMarkdown);
    renderMarkdown();
  }

  function initTextCaseConverter() {
    const inputEl = document.getElementById("text-case-input");
    const outputEl = document.getElementById("text-case-output");
    document.querySelectorAll(".text-case-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = inputEl.value;
        const caseType = btn.dataset.case;
        switch (caseType) {
          case "uppercase":
            outputEl.value = text.toUpperCase();
            break;
          case "lowercase":
            outputEl.value = text.toLowerCase();
            break;
          case "sentencecase":
            outputEl.value = text
              .toLowerCase()
              .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
            break;
          case "titlecase":
            outputEl.value = text
              .toLowerCase()
              .split(" ")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ");
            break;
          case "camelcase":
            outputEl.value = text
              .toLowerCase()
              .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
            break;
          case "pascalcase":
            outputEl.value = text
              .toLowerCase()
              .replace(/(?:^|[^a-zA-Z0-9])(.)/g, (m, chr) => chr.toUpperCase());
            break;
          case "kebabcase":
            outputEl.value = text
              .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
              .replace(/[\s_]+/g, "-")
              .toLowerCase();
            break;
          case "snakecase":
            outputEl.value = text
              .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1_$2")
              .replace(/[\s-]+/g, "_")
              .toLowerCase();
            break;
        }
      });
    });
  }

  function initWordCount() {
    const inputEl = document.getElementById("word-count-input");
    inputEl.addEventListener("input", () => {
      const text = inputEl.value;
      document.getElementById("wc-words").textContent = (
        text.match(/\S+/g) || []
      ).length;
      document.getElementById("wc-chars-spaces").textContent = text.length;
      document.getElementById("wc-sentences").textContent = (
        text.match(
          /[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/g
        ) || []
      ).length;
      document.getElementById("wc-paragraphs").textContent = text
        ? text.split(/\n\s*\n/).filter((p) => p.trim()).length
        : 0;
    });
  }

  function initLoremIpsum() {
    const paragraphsInput = document.getElementById("lorem-paragraphs");
    const generateBtn = document.getElementById("lorem-generate-btn");
    const outputEl = document.getElementById("lorem-output");
    const loremBase =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    generateBtn.addEventListener("click", () => {
      const numParagraphs = parseInt(paragraphsInput.value) || 1;
      outputEl.value = Array(numParagraphs).fill(loremBase).join("\n\n");
    });
    generateBtn.click();
  }

  function initQrCodeGenerator() {
    const textInput = document.getElementById("qrText");
    const sizeSlider = document.getElementById("qrSize");
    const sizeValue = document.getElementById("qrSizeValue");
    const generateBtn = document.getElementById("generateQRBtn");
    const canvasDiv = document.getElementById("qrcode");
    const downloadLink = document.getElementById("downloadQRLink");
    let qrCodeInstance = null;

    sizeSlider.addEventListener(
      "input",
      () => (sizeValue.textContent = sizeSlider.value)
    );

    generateBtn.addEventListener("click", () => {
      const text = textInput.value;
      const size = parseInt(sizeSlider.value);
      if (!text) {
        alert("Please enter text for the QR code.");
        return;
      }
      canvasDiv.innerHTML = "";
      qrCodeInstance = new QRCode(canvasDiv, {
        text,
        width: size,
        height: size,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
      setTimeout(() => {
        const canvas = canvasDiv.querySelector("canvas");
        if (canvas) {
          downloadLink.href = canvas.toDataURL("image/png");
          downloadLink.download = "qrcode.png";
          downloadLink.classList.remove("hidden");
          downloadLink.classList.remove("bg-gray-500");
          downloadLink.classList.add("bg-purple-600");
        }
      }, 100);
    });
  }

  function initUuidGenerator() {
    const generateBtn = document.getElementById("uuid-generate-btn");
    const outputEl = document.getElementById("uuid-output");
    const copyBtn = document.getElementById("uuid-copy-btn");
    generateBtn.addEventListener(
      "click",
      () => (outputEl.value = crypto.randomUUID())
    );
    copyBtn.addEventListener("click", () =>
      genericCopy(outputEl.value, copyBtn)
    );
  }

  function initPasswordGenerator() {
    const lengthSlider = document.getElementById("passwordLength");
    const lengthValue = document.getElementById("lengthValue");
    const outputEl = document.getElementById("generatedPassword");
    const strengthEl = document.getElementById("strengthValue");
    const generateBtn = document.getElementById("generatePasswordBtn");
    const copyBtn = document.getElementById("copyPasswordBtn");
    const checks = {
      uppercase: document.getElementById("uppercase"),
      lowercase: document.getElementById("lowercase"),
      numbers: document.getElementById("numbers"),
      symbols: document.getElementById("symbols"),
    };
    const chars = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    };

    lengthSlider.addEventListener(
      "input",
      () => (lengthValue.textContent = lengthSlider.value)
    );

    generateBtn.addEventListener("click", () => {
      const length = parseInt(lengthSlider.value);
      let charSet = "";
      Object.keys(checks).forEach((key) => {
        if (checks[key].checked) charSet += chars[key];
      });
      if (!charSet) {
        outputEl.value = "Select options!";
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

      let score = 0;
      if (length >= 12) score++;
      if (length >= 16) score++;
      if (checks.uppercase.checked) score++;
      if (checks.lowercase.checked) score++;
      if (checks.numbers.checked) score++;
      if (checks.symbols.checked) score++;
      strengthEl.textContent = [
        "Very Weak",
        "Weak",
        "Medium",
        "Strong",
        "Very Strong",
      ][Math.min(score - 1, 4)];
    });
    copyBtn.addEventListener("click", () =>
      genericCopy(outputEl.value, copyBtn)
    );
    generateBtn.click();
  }

  function initUnitConverter() {
    const categorySelect = document.getElementById("uc-category");
    const valueInput = document.getElementById("uc-value");
    const fromUnitSelect = document.getElementById("uc-from-unit");
    const toUnitSelect = document.getElementById("uc-to-unit");
    const convertBtn = document.getElementById("uc-convert-btn");
    const resultP = document.getElementById("uc-result");
    const units = {
      length: {
        m: { n: "Meters", b: 1 },
        cm: { n: "Centimeters", t: (v) => v / 100, f: (v) => v * 100 },
        km: { n: "Kilometers", t: (v) => v * 1000, f: (v) => v / 1000 },
        in: { n: "Inches", t: (v) => v * 0.0254, f: (v) => v / 0.0254 },
        ft: { n: "Feet", t: (v) => v * 0.3048, f: (v) => v / 0.3048 },
      },
      weight: {
        kg: { n: "Kilograms", b: 1 },
        g: { n: "Grams", t: (v) => v / 1000, f: (v) => v * 1000 },
        lb: { n: "Pounds", t: (v) => v * 0.453592, f: (v) => v / 0.453592 },
      },
      temperature: {
        c: { n: "Celsius" },
        f: { n: "Fahrenheit" },
        k: { n: "Kelvin" },
      },
    };

    function populate() {
      const cat = categorySelect.value;
      fromUnitSelect.innerHTML = "";
      toUnitSelect.innerHTML = "";
      Object.keys(units[cat]).forEach((key) => {
        fromUnitSelect.add(new Option(units[cat][key].n, key));
        toUnitSelect.add(new Option(units[cat][key].n, key));
      });
      if (toUnitSelect.options.length > 1) toUnitSelect.selectedIndex = 1;
    }
    categorySelect.addEventListener("change", populate);
    convertBtn.addEventListener("click", () => {
      const cat = categorySelect.value,
        val = parseFloat(valueInput.value),
        from = fromUnitSelect.value,
        to = toUnitSelect.value;
      if (isNaN(val)) {
        resultP.textContent = "Invalid number.";
        return;
      }
      let result;
      if (cat === "temperature") {
        if (from === to) result = val;
        else if (from === "c")
          result = to === "f" ? (val * 9) / 5 + 32 : val + 273.15;
        else if (from === "f")
          result =
            to === "c" ? ((val - 32) * 5) / 9 : ((val - 32) * 5) / 9 + 273.15;
        else if (from === "k")
          result = to === "c" ? val - 273.15 : ((val - 273.15) * 9) / 5 + 32;
      } else {
        const baseVal = units[cat][from].b ? val : units[cat][from].t(val);
        result = units[cat][to].b ? baseVal : units[cat][to].f(baseVal);
      }
      resultP.textContent = `${val.toFixed(2)} ${
        units[cat][from].n
      } = ${result.toFixed(2)} ${units[cat][to].n}`;
    });
    populate();
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

    toHumanBtn.addEventListener("click", () => {
      const ts = parseInt(unixInput.value);
      if (isNaN(ts)) {
        humanOutput.textContent = "Invalid timestamp.";
        return;
      }
      const date = new Date(ts * (String(ts).length === 10 ? 1000 : 1));
      humanOutput.textContent = `UTC: ${date.toUTCString()}\nLocal: ${date.toLocaleString()}`;
    });
    toUnixBtn.addEventListener("click", () => {
      if (!dateInput.value) return;
      unixOutput.textContent = Math.floor(
        new Date(dateInput.value).getTime() / 1000
      );
    });
    currentBtn.addEventListener("click", () => {
      const now = new Date();
      currentOutput.textContent = Math.floor(now.getTime() / 1000);
      unixInput.value = Math.floor(now.getTime() / 1000);
      const y = now.getFullYear(),
        m = (now.getMonth() + 1).toString().padStart(2, "0"),
        d = now.getDate().toString().padStart(2, "0");
      const h = now.getHours().toString().padStart(2, "0"),
        min = now.getMinutes().toString().padStart(2, "0");
      dateInput.value = `${y}-${m}-${d}T${h}:${min}`;
      toHumanBtn.click();
    });
    currentBtn.click();
  }

  function initTimezoneConverter() {
    const dtLocalInput = document.getElementById("tz-datetime-local");
    const targetTzSelect = document.getElementById("tz-target-timezone");
    const convertBtn = document.getElementById("tz-convert-btn");
    const outputP = document.getElementById("tz-output");

    try {
      const timezones = Intl.supportedValuesOf("timeZone");
      timezones.forEach((tz) => targetTzSelect.add(new Option(tz, tz)));
      targetTzSelect.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e) {
      // Fallback for older browsers
      ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"].forEach((tz) =>
        targetTzSelect.add(new Option(tz, tz))
      );
    }

    convertBtn.addEventListener("click", () => {
      const localDateTime = dtLocalInput.value;
      if (!localDateTime) {
        outputP.textContent = "Please select a date.";
        return;
      }
      const date = new Date(localDateTime);
      const options = {
        timeZone: targetTzSelect.value,
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZoneName: "short",
      };
      outputP.textContent = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
    });

    // Set initial value and convert
    const now = new Date();
    dtLocalInput.value = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}T${now
      .getHours()
      .toString()
      .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    convertBtn.click();
  }

  function initRegexTester() {
    const patternInput = document.getElementById("regex-pattern");
    const flagsInput = document.getElementById("regex-flags");
    const testStringInput = document.getElementById("regex-test-string");
    const resultDiv = document.getElementById("regex-result");

    function testRegex() {
      const pattern = patternInput.value,
        flags = flagsInput.value,
        testString = testStringInput.value;
      if (!pattern) {
        resultDiv.innerHTML =
          '<p class="text-gray-400">Enter a pattern to start.</p>';
        return;
      }
      try {
        const regex = new RegExp(pattern, flags);
        const highlighted = testString.replace(
          regex,
          (match) =>
            `<mark class="bg-yellow-400 text-black px-1 rounded">${match}</mark>`
        );
        const matches = testString.match(regex);
        resultDiv.innerHTML = `<p class="mb-2"><strong>Matches: ${
          matches ? matches.length : 0
        }</strong></p><div class="whitespace-pre-wrap">${highlighted}</div>`;
      } catch (e) {
        resultDiv.innerHTML = `<p class="text-red-400">Invalid RegEx: ${e.message}</p>`;
      }
    }
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

    async function fetchClientIpInfo() {
      try {
        const data = await (await fetch("https://ipapi.co/json/")).json();
        clientIpEl.value = data.ip || "N/A";
        ipLocationEl.value = `${data.city || ""}, ${data.country_name || ""}`;
      } catch (e) {
        clientIpEl.value = "Error";
        ipLocationEl.value = "Could not fetch data.";
      }
    }
    fetchClientIpInfo();

    ipLookupBtn.addEventListener("click", async () => {
      const query = ipLookupInput.value.trim();
      if (!query) return;
      ipLookupResultEl.innerHTML = "Looking up...";
      try {
        const data = await (
          await fetch(`https://ipapi.co/${encodeURIComponent(query)}/json/`)
        ).json();
        if (data.error) throw new Error(data.reason);
        ipLookupResultEl.innerHTML = Object.entries(data)
          .map(([k, v]) => `<strong>${k}:</strong> ${v}`)
          .join("<br>");
      } catch (e) {
        ipLookupResultEl.innerHTML = `<p class="text-red-400">Error: ${e.message}</p>`;
      }
    });

    dnsLookupBtn.addEventListener("click", async () => {
      const domain = dnsInput.value.trim(),
        recordType = dnsRecordTypeSelect.value;
      if (!domain) return;
      dnsResultEl.innerHTML = "Querying...";
      try {
        const res = await fetch(
          `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(
            domain
          )}&type=${recordType}`,
          { headers: { accept: "application/dns-json" } }
        );
        const data = await res.json();
        if (data.Status !== 0)
          throw new Error(`DNS Query Failed (Status: ${data.Status})`);
        if (data.Answer) {
          dnsResultEl.innerHTML = data.Answer.map(
            (ans) => `• ${ans.data} (TTL: ${ans.TTL})`
          ).join("<br>");
        } else {
          dnsResultEl.textContent = "No records found.";
        }
      } catch (e) {
        dnsResultEl.innerHTML = `<p class="text-red-400">Error: ${e.message}</p>`;
      }
    });
  }
});
