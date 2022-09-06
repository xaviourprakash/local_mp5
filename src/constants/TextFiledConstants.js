export const LimitationUnits = [{ label: "words", value: "words" }];

export const RegexOptions = [
  { label: "Open format", value: "openFormat", regexValue: "" },
  { label: "Whole number", value: "wholeNumber", regexValue: "^d+$" },
  { label: "Decimal number", value: "decimalNumber", regexValue: "^d+(.d+)?$" },
  { label: "Email address", value: "emailAddress", regexValue: "A[w+-_.]+@[a-zd-_.]+.[a-z]+z" },
];

export const ConformationCodeTypes = [
  { label: "Not selected", value: "" },
  { label: "Fixed", value: "fixed" },
  { label: "Regexp", value: "regexp"},
];

export const LayoutOptions = [
  { label: "1 Column", value: "1" },
  { label: "2 Columns", value: "2" },
  { label: "3 Columns", value: "3" },
  { label: "4 Columns", value: "4" },
  { label: "5 Columns", value: "5" },
  { label: "6 Columns", value: "6" },
  { label: "7 Columns", value: "7" },
  { label: "8 Columns", value: "8" },
  { label: "9 Columns", value: "9" },
  { label: "10 Columns", value: "10" },
  { label: "11 Columns", value: "11" },
  { label: "12 Columns", value: "12" },
];

export const Camera = [
  { label: "Not selected", value: "" },
  { label: "Use Main Camera", value: "back" },
  { label: "Use Front Camera (selfie)", value: "front" },
  { label: "Allow both", value: "all" }
];

export const CameraOrientation = [
  { label: "Not selected", value: "" },
  { label: "Any orientation", value: "all" },
  { label: "Portrait", value: "portrait" },
  { label: "Landscape", value: "landscape" }
];

export const ShotMode = [
  { label: "Not selected", value: "" },
  { label: "Single", value: "single" },
  { label: "Series", value: "series" }
];

export const CameraLens = [
  { label: "Not selected", value: "" },
  { label: "any lens", value: "any" },
  { label: "wide-angle lens", value: "wide-angle" },
  { label: "telephoto lens", value: "telephoto" }
];

export const MinimumResolution = [
  { label: "Not selected", value: "" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "4", value: "4" },
  { label: "6", value: "6" },
  { label: "8", value: "8" },
  { label: "10", value: "10" },
  { label: "12", value: "12" }
];

export const Flash = [
  { label: "Not selected", value: "" },
  { label: "Any", value: "any" },
  { label: "Enable", value: "enable" },
  { label: "Disable", value: "disable" },
  { label: "Auto", value: "auto" }
];

export const Source = [
  { label: "Not selected", value: "" },
  { label: "Camera", value: "camera" },
  { label: "Library", value: "library" },
  { label: "Screen Recording", value: "screen_recording" },
  { label: "Camera + Library", value: "all" }
];

export const PhotoFormat = [
  { label: "Not selected", value: "" },
  { label: "JPG", value: "none" },
  { label: "Apple ProRAW + JPG", value: "appleProRAW" },
  { label: "Bayer RAW + JPG", value: "bayerRAW" },
  { label: "Any RAW Format + JPG", value: "anyRAW" }
];

export const FillAndOutlineMethod = [
  { label: "Not selected", value: "" },
  { label: "colorFill", value: "colorFill" },
  { label: "gaussianBlur", value: "gaussianBlur" },
  { label: "inpaintTelea", value: "inpaintTelea" },
  { label: "inpaintNs", value: "inpaintNs" },
  { label: "inpaintNsAndGaussianBlur", value: "inpaintNsAndGaussianBlur" },
  { label: "inpaintTeleaAndGaussianBlur", value: "inpaintTeleaAndGaussianBlur" }
];

export const Shape = [
  { label: "Not selected", value: "" },
  { label: "Rectangle", value: "rectangle" },
  { label: "Ellipse", value: "ellipse" }
];
export const AudioFormat = [
  { label: "Not selected", value: "" },
  { label: "Uncompressed - PCM, 44.1kHz, 16Bit, stereo (.wav)", value: "WAV-44.1kHZ-16Bit-Stereo" },
  { label: "Uncompressed - PCM, 44.1kHz, 16bit, mono (.wav)", value: "WAV-44.1kHZ-16Bit-Mono" },
  { label: "Uncompressed - PCM, 16kHz, 16bit, mono (.wav)", value: "WAV-16kHZ-16Bit-Mono" },
  { label: "Uncompressed - PCM, 8kHz, 8Bit, mono, A-law (.wav)", value: "WAV-8kHZ-8Bit-Mono-ALaw" },
  { label: "Uncompressed - PCM, 8kHz. 8Bit, mono (.wav)", value: "WAV-8kHZ-8Bit-Mono" }

];