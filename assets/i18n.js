(() => {
  'use strict';

  const STORAGE_KEY = 'pdf_toolkit_language';
  const VALID_LANGS = new Set(['ja', 'en']);

  const PAIRS = [
    // Shared shell / common UI
    ['PDFツール', 'PDF Toolkit'],
    ['4つのPDFツールを1つのサイトに集約', 'Four browser-based PDF utilities in one site'],
    ['PDFトリミング', 'Crop PDF'],
    ['PDF OCR', 'OCR PDF'],
    ['PDF分割', 'Split PDF'],
    ['PDFをトリミング', 'Crop PDF'],
    ['PDFを分割', 'Split PDF'],
    ['JPEG to PDF', 'JPEG to PDF'],
    ['読み込み中…', 'Loading…'],
    ['JPEG → PDF を読み込み中…', 'Loading JPEG → PDF…'],
    ['PDFトリミングを読み込み中…', 'Loading Crop PDF…'],
    ['PDF OCRを読み込み中…', 'Loading OCR PDF…'],
    ['PDF分割を読み込み中…', 'Loading Split PDF…'],
    ['言語', 'Language'],
    ['PDFツールナビゲーション', 'PDF tools'],
    ['ブラウザ内処理のみ — アップロード・トラッキングなし。', 'Client-side processing only — no upload, no tracking.'],
    ['ブラウザ内処理のみ — アップロード・トラッキングなし。Tesseract.js、pdf.js、pdf-libを使用。', 'Client-side processing only — no upload, no tracking. Powered by Tesseract.js, pdf.js & pdf-lib.'],
    ['ブラウザ内処理のみ — アップロード・トラッキングなし。pdf.js、pdf-lib、JSZipを使用。', 'Client-side processing only — no upload, no tracking. Powered by pdf.js, pdf-lib & JSZip.'],
    ['JPEG → PDF 変換', 'JPEG to PDF Converter'],

    // Common tool labels
    ['ファイル', 'Files'],
    ['PDF設定', 'PDF Settings'],
    ['トリミング設定', 'Crop Settings'],
    ['OCR設定', 'OCR Settings'],
    ['ドキュメント', 'Documents'],
    ['ページ', 'Pages'],
    ['ダウンロード', 'Downloads'],
    ['分割設定', 'Split Settings'],
    ['別のファイルを開く', 'Open another file'],
    ['PDFをドロップ または クリックして選択', 'Drop a PDF here or click to choose'],
    ['PDF ファイル（1ファイル）', 'PDF file (single file)'],
    ['PDF ファイル（複数選択可）', 'PDF files (multiple selection allowed)'],
    ['ファイル名', 'File name'],
    ['出力ファイル名', 'Output file name'],
    ['.pdf は自動で付加されます', '.pdf is added automatically'],
    ['PDFを読み込み中...', 'Loading PDF...'],
    ['PDFを書き出し中...', 'Writing PDF...'],
    ['PDFを生成中...', 'Generating PDF...'],
    ['エラーがあります', 'There are errors'],
    ['実行可能です', 'Ready to run'],
    ['検証', 'Validation'],
    ['処理を中止', 'Cancel processing'],
    ['完了しました', 'Completed'],
    ['前へ', 'Previous'],
    ['後へ', 'Next'],
    ['削除', 'Remove'],
    ['個別', 'Individual'],

    // JPEG → PDF
    ['一括変換', 'batch converter'],
    ['複数のJPEG画像を1つのPDFファイルに結合します。すべての処理はお使いのブラウザ内で行われ、画像はサーバーに送信されません。', 'Combine multiple JPEG images into a single PDF. All processing takes place in your browser, and images are never uploaded to a server.'],
    ['画像をドロップ または クリックして選択', 'Drop images here or click to choose'],
    ['JPEG / JPG（複数選択可）', 'JPEG / JPG (multiple selection allowed)'],
    ['まだ画像が追加されていません', 'No images have been added yet'],
    ['すべて削除', 'Remove all'],
    ['ファイル名で並び替え', 'Sort by file name'],
    ['用紙サイズ', 'Page size'],
    ['レター', 'Letter'],
    ['リーガル', 'Legal'],
    ['画像サイズに合わせる', 'Fit to image size'],
    ['向き', 'Orientation'],
    ['自動（画像に合わせる）', 'Auto (match image)'],
    ['縦', 'Portrait'],
    ['横', 'Landscape'],
    ['「画像サイズに合わせる」選択時は無視されます', 'Ignored when “Fit to image size” is selected'],
    ['余白 (mm)', 'Margin (mm)'],
    ['JPEG品質', 'JPEG quality'],
    ['最高（無圧縮）', 'Maximum (no compression)'],
    ['高（推奨）', 'High (recommended)'],
    ['中', 'Medium'],
    ['低（小サイズ）', 'Low (smaller file)'],
    ['PDFを生成してダウンロード', 'Generate and download PDF'],
    ['JPEGファイルが見つかりませんでした', 'No JPEG files were found'],
    ['画像を読み込み中...', 'Loading images...'],
    ['すべての画像を削除しますか？', 'Remove all images?'],

    // Crop PDF
    ['PDF Crop — トリミングツール', 'PDF Crop — Trimming Tool'],
    ['トリミングツール', 'trimming tool'],
    ['PDFのページを視覚的にトリミングします。ドラッグして切り抜き範囲を指定し、PDFとして保存してください。すべての処理はブラウザ内で完結し、ファイルはサーバーに送信されません。', 'Visually crop PDF pages. Drag to define the crop area, then save the result as a PDF. All processing takes place in your browser, and files are never uploaded to a server.'],
    ['キャンバス上でドラッグしてトリミング範囲を選択してください', 'Drag on the canvas to select the crop area'],
    ['トリミング範囲（mm）', 'Crop margins (mm)'],
    ['左', 'Left'],
    ['右', 'Right'],
    ['上', 'Top'],
    ['下', 'Bottom'],
    ['このページをリセット', 'Reset this page'],
    ['すべてのページに同じ設定を適用', 'Apply the same settings to all pages'],
    ['出力', 'Output'],
    ['ページを読み込み中...', 'Loading page...'],
    ['ページの表示に失敗しました', 'Failed to display the page'],
    ['ドラッグして範囲を選択しています...', 'Selecting crop area...'],
    ['ドラッグして範囲を変更、またはハンドルでサイズ調整できます', 'Drag to move the crop area or use the handles to resize it'],
    ['PDFを書き出し中...', 'Writing PDF...'],

    // OCR PDF
    ['PDF OCR — 検索可能PDF変換', 'PDF OCR — Searchable PDF Converter'],
    ['検索可能PDF', 'searchable pdf'],
    ['スキャンされたPDFを、文字を検索・選択できるPDFに変換します。安全出力では各ページを画像として新PDFに貼り直し、その上にOCR文字レイヤーを重ねます。すべての処理はブラウザ内で完結し、ファイルはサーバーに送信されません。', 'Convert scanned PDFs into searchable, selectable PDFs. Safe output rebuilds each page as an image in a new PDF and overlays an OCR text layer. All processing takes place in your browser, and files are never uploaded to a server.'],
    ['処理中はタブを閉じないでください。空白PDF対策として、既定では「安全出力」を使います。この方式は元ページを画像化して新PDFに貼り直すため、元PDFをそのまま再保存する方式より空白化しにくいです。', 'Do not close this tab while processing. Safe output is used by default to reduce blank-output issues. It rasterizes each original page into a new PDF, which is less likely to produce blank pages than directly resaving the source PDF.'],
    ['認識言語', 'Recognition language'],
    ['日本語 + 英語', 'Japanese + English'],
    ['日本語のみ', 'Japanese only'],
    ['英語のみ', 'English only'],
    ['混在する文書は「日本語 + 英語」が無難です', 'For mixed-language documents, “Japanese + English” is generally recommended'],
    ['レンダリング解像度', 'Rendering resolution'],
    ['標準（メモリ節約・推奨）', 'Standard (memory-saving, recommended)'],
    ['高', 'High'],
    ['最高（重い）', 'Maximum (resource intensive)'],
    ['空白化やメモリ不足が出る場合は標準を使ってください', 'Use Standard if blank output or memory shortages occur'],
    ['並列処理', 'Parallel processing'],
    ['安定（1ページずつ）', 'Stable (1 page at a time)'],
    ['高速（2ページ並列・推奨）', 'Fast (2 pages in parallel, recommended)'],
    ['より高速（3ページ並列・メモリ多め）', 'Faster (3 pages in parallel, more memory)'],
    ['最大（4ページ並列・重い）', 'Maximum (4 pages in parallel, resource intensive)'],
    ['枚数が多いPDFでは2〜3並列が有効です。メモリ不足時は1に戻してください。', 'For PDFs with many pages, 2–3 parallel workers can help. Return to 1 if memory becomes insufficient.'],
    ['出力方式', 'Output mode'],
    ['安全出力（ページ画像として新PDFに再構成）', 'Safe output (rebuild as page images in a new PDF)'],
    ['元PDF保持（軽量だがPDFによって空白化する場合あり）', 'Preserve source PDF (lighter, but may produce blank pages for some PDFs)'],
    ['「保存したPDFが空白」になる場合は安全出力を使ってください', 'Use Safe output if the saved PDF is blank'],
    ['安全出力の画像品質', 'Image quality for Safe output'],
    ['軽量', 'Lightweight'],
    ['標準', 'Standard'],
    ['高品質（ファイル大）', 'High quality (larger file)'],
    ['スキャン文書では標準で十分な場合が多いです', 'Standard quality is usually sufficient for scanned documents'],
    ['OCR文字レイヤーを薄く表示する（確認用）', 'Show the OCR text layer faintly (for verification)'],
    ['通常はオフにしてください。検索できない場合の確認用です。', 'Normally leave this off. Use it to verify the text layer if search does not work.'],
    ['OCRを実行して検索可能PDFを生成', 'Run OCR and create searchable PDF'],
    ['認識テキスト（先頭ページのプレビュー）', 'Recognized text (first-page preview)'],
    ['PDFが読み込まれていません', 'No PDF is loaded'],
    ['canvas を画像化できませんでした', 'Could not convert the canvas to an image'],
    ['ページの描画に失敗しました', 'Failed to render the page'],
    ['日本語フォントを準備中...', 'Preparing Japanese font...'],
    ['PDFを書き出し中...', 'Writing PDF...'],
    ['出力PDFのサイズが異常に小さいため保存を中止しました', 'Saving was stopped because the output PDF size is unexpectedly small'],
    ['フォントの取得に失敗しました', 'Failed to retrieve the font'],

    // Split PDF
    ['PDF Split — 分割ツール', 'PDF Split — Split Tool'],
    ['範囲・ページ・しおり・白紙ページ分割', 'range, pages, bookmarks & blank-page split'],
    ['PDFをページ範囲、固定ページ数、しおり、白紙ページ、または選択ページで分割します。ページの削除・並び替え、個別ダウンロード、複数PDFへの同一ルール適用にも対応しています。処理はブラウザ内で完結します。', 'Split PDFs by page ranges, fixed page counts, bookmarks, blank pages, or selected pages. You can also delete and reorder pages, download outputs individually, and apply the same rules to multiple PDFs. Processing is completed entirely in the browser.'],
    ['PDFを追加', 'Add PDF'],
    ['すべて閉じる', 'Close all'],
    ['パスワード保護PDFや一部の特殊なPDFはブラウザ内処理では分割できない場合があります。大量ページのPDFでは処理中にタブを閉じないでください。', 'Password-protected or certain unusual PDFs may not be splittable in the browser. Do not close the tab while processing large PDFs.'],
    ['範囲指定のページ番号は、現在の表示順に対する番号です。カード内には「表示順」と「元PDFのページ番号」を表示します。削除済みページは出力から除外されます。', 'Page numbers in range settings refer to the current display order. Each card shows both the display position and the original PDF page number. Deleted pages are excluded from output.'],
    ['すべて選択', 'Select all'],
    ['選択解除', 'Clear selection'],
    ['奇数ページ', 'Odd pages'],
    ['偶数ページ', 'Even pages'],
    ['選択ページを削除', 'Delete selected pages'],
    ['削除を戻す', 'Restore deleted pages'],
    ['選択を前へ', 'Move selection earlier'],
    ['選択を後へ', 'Move selection later'],
    ['順序リセット', 'Reset order'],
    ['サムネイル生成', 'Generate thumbnails'],
    ['白紙ページを検出', 'Detect blank pages'],
    ['PDFを読み込むとページが表示されます', 'Pages will appear after a PDF is loaded'],
    ['分割方法', 'Split method'],
    ['分割', 'Split'],
    ['抽出', 'Extract'],
    ['分割モード', 'Split mode'],
    ['カスタム範囲', 'Custom ranges'],
    ['固定範囲', 'Fixed-size groups'],
    ['しおり単位', 'By bookmark'],
    ['白紙ページで分割', 'Split at blank pages'],
    ['しおり分割と白紙分割は、対応する情報があるPDFでのみ使用できます', 'Bookmark and blank-page splitting are available only when the PDF contains the required information'],
    ['ページ範囲', 'Page ranges'],
    ['例:\n1-3\n4-6\n7,9-10', 'Example:\n1-3\n4-6\n7,9-10'],
    ['改行ごとに別PDFになります。範囲は現在の表示順に基づきます。', 'Each line becomes a separate PDF. Ranges are based on the current display order.'],
    ['すべての範囲を1つのPDFにまとめる', 'Merge all ranges into one PDF'],
    ['何ページごとに分割するか', 'Pages per split'],
    ['例: 2 を指定すると、1-2、3-4、5-6…のように分割します', 'Example: entering 2 creates 1-2, 3-4, 5-6, and so on'],
    ['PDFのしおり開始ページを使って章ごとに分割します。しおりがないPDFでは使用できません。', 'Split by chapter using bookmark start pages. This option is unavailable for PDFs without bookmarks.'],
    ['ファイル名にしおり名を使う', 'Use bookmark titles in file names'],
    ['白紙判定の許容率 (%)', 'Blank-page tolerance (%)'],
    ['数値が大きいほど、薄いノイズがあるページも白紙扱いになりやすくなります', 'Higher values make pages with faint noise more likely to be treated as blank'],
    ['区切りの白紙ページも出力に含める', 'Include separator blank pages in output'],
    ['抽出モード', 'Extraction mode'],
    ['すべてのページを個別PDFにする', 'Create a separate PDF for every page'],
    ['指定ページだけ抽出する', 'Extract only specified pages'],
    ['抽出するページ', 'Pages to extract'],
    ['例: 1,5-8', 'Example: 1,5-8'],
    ['ページカードの選択内容と同期します。番号は現在の表示順に基づきます。', 'Synced with the selected page cards. Numbers are based on the current display order.'],
    ['抽出ページを1つのPDFにまとめる', 'Merge extracted pages into one PDF'],
    ['複数PDF処理', 'Multiple-PDF processing'],
    ['現在のPDFだけ処理', 'Process only the current PDF'],
    ['読み込み済みPDFすべてに同じ設定を適用', 'Apply the same settings to all loaded PDFs'],
    ['ページ削除・並び替え・選択状態は各PDFごとに保持されます', 'Deleted pages, page order, and selections are stored separately for each PDF'],
    ['ZIP / 一括保存名', 'ZIP / batch output name'],
    ['ZIP名や {base} プレースホルダーに使います', 'Used for the ZIP name and the {base} placeholder'],
    ['ファイル名ルール', 'File naming rule'],
    ['カスタム', 'Custom'],
    ['カスタムテンプレート', 'Custom template'],
    ['{base}: 一括保存名', '{base}: batch output name'],
    ['{source}: 元PDF名', '{source}: source PDF name'],
    ['{index}: 連番', '{index}: sequence number'],
    ['{range}: 表示順の範囲', '{range}: display-order range'],
    ['{start} / {end}: 開始・終了番号', '{start} / {end}: start/end numbers'],
    ['{page}: 単ページ時の元ページ番号', '{page}: original page number for a single-page output'],
    ['{mode}: 分割モード', '{mode}: split mode'],
    ['PDFを分割してダウンロード', 'Split PDF and download'],
    ['中止要求を受け付けました。現在の処理単位が終わると停止します。', 'Cancellation requested. Processing will stop after the current unit finishes.'],
    ['パスワード保護PDF、または暗号化PDFはこのブラウザ内ツールでは処理できない場合があります', 'Password-protected or encrypted PDFs may not be processable with this browser-based tool'],
    ['PDFファイルが見つかりませんでした', 'No PDF files were found'],
    ['100ページ超のPDFは処理に時間がかかる場合があります', 'PDFs with more than 100 pages may take a long time to process'],
    ['50MB超のPDFはブラウザのメモリ不足に注意してください', 'For PDFs larger than 50 MB, be aware of possible browser memory limits'],
    ['複数PDF処理を使えます', 'Multiple-PDF processing is available'],
    ['必要なPDFだけ処理する設定を推奨します', 'Processing only the PDFs you need is recommended'],
    ['サムネイルを生成中...', 'Generating thumbnails...'],
    ['サムネイル生成エラー:', 'Thumbnail generation error:'],
    ['白紙ページを検出中...', 'Detecting blank pages...'],
    ['白紙検出エラー:', 'Blank-page detection error:'],
    ['ページ番号が入力されていません', 'No page numbers were entered'],
    ['出力対象ページがありません。削除を戻してください。', 'There are no pages to output. Restore deleted pages.'],
    ['ページ範囲を入力してください。', 'Enter at least one page range.'],
    ['固定範囲には1以上の整数を入力してください。', 'Enter an integer of 1 or greater for the fixed-size group.'],
    ['このPDFには利用可能なしおりが見つかりません。', 'No usable bookmarks were found in this PDF.'],
    ['しおり開始ページがすべて削除済みです。', 'All bookmark start pages have been deleted.'],
    ['白紙ページを検出してから実行してください。', 'Detect blank pages before running this mode.'],
    ['白紙ページが検出されていません。1つのPDFとして出力されます。', 'No blank pages were detected. The document will be output as a single PDF.'],
    ['出力予定がありません。', 'There is no planned output.'],
    ['100ページ超のPDFです。処理に時間がかかる場合があります。', 'This PDF has more than 100 pages and may take a long time to process.'],
    ['50MB超のPDFです。ブラウザのメモリ不足に注意してください。', 'This PDF is larger than 50 MB. Be aware of possible browser memory limits.'],
    ['現在のPDFの出力予定はありません', 'There is no planned output for the current PDF'],
    ['現在のPDFのみ', 'Current PDF only'],
    ['エラーがあります。設定を確認してください。', 'There are errors. Check the settings.'],
    ['PDFを分割中...', 'Splitting PDF...'],
    ['ZIPを作成中...', 'Creating ZIP...'],
    ['分割PDF一式をZIPでダウンロード', 'Download all split PDFs as a ZIP'],
    ['処理を中止しました', 'Processing was cancelled'],
    ['白紙', 'Blank'],
    ['除外', 'Excluded'],
    ['表示順', 'Display order'],
    ['元ページ', 'Original page'],
    ['このPDFを閉じる', 'Close this PDF'],
    ['しおり', 'Bookmark'],
    ['例', 'Example']
  ];

  const jaToEn = new Map();
  const enToJa = new Map();
  for (const [ja, en] of PAIRS) {
    jaToEn.set(ja, en);
    enToJa.set(en, ja);
  }

  const regexRules = [
    // Common numeric/status patterns
    { ja: /^(\d+) 件$/, en: /^(\d+) items$/, toEn: m => `${m[1]} items`, toJa: m => `${m[1]} 件` },
    { ja: /^完了: (.+)$/s, en: /^Completed: (.+)$/s, toEn: m => `Completed: ${m[1]}`, toJa: m => `完了: ${m[1]}` },
    { ja: /^エラー: (.+)$/s, en: /^Error: (.+)$/s, toEn: m => `Error: ${translateCore(m[1], 'en')}`, toJa: m => `エラー: ${translateCore(m[1], 'ja')}` },
    { ja: /^エラーが発生しました: (.+)$/s, en: /^An error occurred: (.+)$/s, toEn: m => `An error occurred: ${translateCore(m[1], 'en')}`, toJa: m => `エラーが発生しました: ${translateCore(m[1], 'ja')}` },
    { ja: /^画像を読み込み中\.\.\. (\d+) \/ (\d+)$/, en: /^Loading images\.\.\. (\d+) \/ (\d+)$/, toEn: m => `Loading images... ${m[1]} / ${m[2]}`, toJa: m => `画像を読み込み中... ${m[1]} / ${m[2]}` },
    { ja: /^PDFを生成中\.\.\. (\d+) \/ (\d+)$/, en: /^Generating PDF\.\.\. (\d+) \/ (\d+)$/, toEn: m => `Generating PDF... ${m[1]} / ${m[2]}`, toJa: m => `PDFを生成中... ${m[1]} / ${m[2]}` },
    { ja: /^処理中\.\.\. (\d+) \/ (\d+)$/, en: /^Processing\.\.\. (\d+) \/ (\d+)$/, toEn: m => `Processing... ${m[1]} / ${m[2]}`, toJa: m => `処理中... ${m[1]} / ${m[2]}` },

    // OCR patterns
    { ja: /^(\d+) ページ · ([0-9.,]+\s*(?:B|KB|MB|GB|TB))$/i, en: /^(\d+) pages · ([0-9.,]+\s*(?:B|KB|MB|GB|TB))$/i, toEn: m => `${m[1]} pages · ${m[2]}`, toJa: m => `${m[1]} ページ · ${m[2]}` },
    { ja: /^OCRエンジンを初期化中\.\.\. (\d+) \/ (\d+)$/, en: /^Initializing OCR engine\.\.\. (\d+) \/ (\d+)$/, toEn: m => `Initializing OCR engine... ${m[1]} / ${m[2]}`, toJa: m => `OCRエンジンを初期化中... ${m[1]} / ${m[2]}` },
    { ja: /^OCR処理中\.\.\. (\d+) \/ (\d+) ページ完了（(\d+)並列）$/, en: /^Running OCR\.\.\. (\d+) \/ (\d+) pages complete \((\d+) parallel\)$/, toEn: m => `Running OCR... ${m[1]} / ${m[2]} pages complete (${m[3]} parallel)`, toJa: m => `OCR処理中... ${m[1]} / ${m[2]} ページ完了（${m[3]}並列）` },
    { ja: /^PDFへ反映中\.\.\. (\d+) \/ (\d+) ページ付近$/, en: /^Applying OCR to PDF\.\.\. around page (\d+) \/ (\d+)$/, toEn: m => `Applying OCR to PDF... around page ${m[1]} / ${m[2]}`, toJa: m => `PDFへ反映中... ${m[1]} / ${m[2]} ページ付近` },
    { ja: /^(\d+)ページ目のPDFページを取得できませんでした$/, en: /^Could not retrieve PDF page (\d+)$/, toEn: m => `Could not retrieve PDF page ${m[1]}`, toJa: m => `${m[1]}ページ目のPDFページを取得できませんでした` },
    { ja: /^(.+) をダウンロード$/, en: /^Download (.+)$/, toEn: m => `Download ${m[1]}`, toJa: m => `${m[1]} をダウンロード` },
    { ja: /^完了: (.+)\n出力サイズ: (.+)\n処理設定: (\d+)並列$/, en: /^Completed: (.+)\nOutput size: (.+)\nProcessing: (\d+) parallel$/, toEn: m => `Completed: ${m[1]}\nOutput size: ${m[2]}\nProcessing: ${m[3]} parallel`, toJa: m => `完了: ${m[1]}\n出力サイズ: ${m[2]}\n処理設定: ${m[3]}並列` },
    { ja: /^自動保存されない場合:$/, en: /^If the download does not start automatically:$/, toEn: () => 'If the download does not start automatically:', toJa: () => '自動保存されない場合:' },

    // Split PDF patterns
    { ja: /^PDFを読み込み中\.\.\. (\d+) \/ (\d+)$/, en: /^Loading PDFs\.\.\. (\d+) \/ (\d+)$/, toEn: m => `Loading PDFs... ${m[1]} / ${m[2]}`, toJa: m => `PDFを読み込み中... ${m[1]} / ${m[2]}` },
    { ja: /^(.+): ページが見つかりませんでした$/, en: /^(.+): no pages were found$/, toEn: m => `${m[1]}: no pages were found`, toJa: m => `${m[1]}: ページが見つかりませんでした` },
    { ja: /^しおり (\d+)$/, en: /^Bookmark (\d+)$/, toEn: m => `Bookmark ${m[1]}`, toJa: m => `しおり ${m[1]}` },
    { ja: /^(\d+) ページ · (.+) · しおり (\d+) 件(?: · 白紙 (\d+) 件)?$/, en: /^(\d+) pages · (.+) · (\d+) bookmarks(?: · (\d+) blank pages)?$/, toEn: m => `${m[1]} pages · ${m[2]} · ${m[3]} bookmarks${m[4] ? ` · ${m[4]} blank pages` : ''}`, toJa: m => `${m[1]} ページ · ${m[2]} · しおり ${m[3]} 件${m[4] ? ` · 白紙 ${m[4]} 件` : ''}` },
    { ja: /^(\d+) ページ · 出力対象 (\d+) ページ · (.+)$/, en: /^(\d+) pages · (\d+) output pages · (.+)$/, toEn: m => `${m[1]} pages · ${m[2]} output pages · ${m[3]}`, toJa: m => `${m[1]} ページ · 出力対象 ${m[2]} ページ · ${m[3]}` },
    { ja: /^(\d+) 件のPDFを読み込み中です$/, en: /^(\d+) PDFs are loaded$/, toEn: m => `${m[1]} PDFs are loaded`, toJa: m => `${m[1]} 件のPDFを読み込み中です` },
    { ja: /^(\d+) 件のPDFを読み込み中です。複数PDF処理を使えます$/, en: /^(\d+) PDFs are loaded\. Multiple-PDF processing is available$/, toEn: m => `${m[1]} PDFs are loaded. Multiple-PDF processing is available`, toJa: m => `${m[1]} 件のPDFを読み込み中です。複数PDF処理を使えます` },
    { ja: /^合計 (\d+) ページです$/, en: /^There are (\d+) pages in total$/, toEn: m => `There are ${m[1]} pages in total`, toJa: m => `合計 ${m[1]} ページです` },
    { ja: /^合計 (\d+) ページです。必要なPDFだけ処理する設定を推奨します$/, en: /^There are (\d+) pages in total\. Processing only the PDFs you need is recommended$/, toEn: m => `There are ${m[1]} pages in total. Processing only the PDFs you need is recommended`, toJa: m => `合計 ${m[1]} ページです。必要なPDFだけ処理する設定を推奨します` },
    { ja: /^表示順: (除外|\d+)$/, en: /^Display order: (Excluded|\d+)$/, toEn: m => `Display order: ${m[1] === '除外' ? 'Excluded' : m[1]}`, toJa: m => `表示順: ${m[1] === 'Excluded' ? '除外' : m[1]}` },
    { ja: /^元ページ: (\d+)$/, en: /^Original page: (\d+)$/, toEn: m => `Original page: ${m[1]}`, toJa: m => `元ページ: ${m[1]}` },
    { ja: /^サムネイルを生成中\.\.\. (\d+) \/ (\d+)$/, en: /^Generating thumbnails\.\.\. (\d+) \/ (\d+)$/, toEn: m => `Generating thumbnails... ${m[1]} / ${m[2]}`, toJa: m => `サムネイルを生成中... ${m[1]} / ${m[2]}` },
    { ja: /^(\d+) ページ中 (\d+) ページまでサムネイルを生成しました$/, en: /^Generated thumbnails for (\d+) of (\d+) pages$/, toEn: m => `Generated thumbnails for ${m[2]} of ${m[1]} pages`, toJa: m => `${m[2]} ページ中 ${m[1]} ページまでサムネイルを生成しました` },
    { ja: /^白紙ページを検出中\.\.\. (\d+) \/ (\d+)$/, en: /^Detecting blank pages\.\.\. (\d+) \/ (\d+)$/, toEn: m => `Detecting blank pages... ${m[1]} / ${m[2]}`, toJa: m => `白紙ページを検出中... ${m[1]} / ${m[2]}` },
    { ja: /^白紙検出完了: (\d+) ページ$/, en: /^Blank-page detection complete: (\d+) pages$/, toEn: m => `Blank-page detection complete: ${m[1]} pages`, toJa: m => `白紙検出完了: ${m[1]} ページ` },
    { ja: /^逆順の範囲があります: (.+)$/, en: /^A range is reversed: (.+)$/, toEn: m => `A range is reversed: ${m[1]}`, toJa: m => `逆順の範囲があります: ${m[1]}` },
    { ja: /^範囲外のページがあります: (.+)（1〜(\d+)）$/, en: /^A page is outside the valid range: (.+) \(1–(\d+)\)$/, toEn: m => `A page is outside the valid range: ${m[1]} (1–${m[2]})`, toJa: m => `範囲外のページがあります: ${m[1]}（1〜${m[2]}）` },
    { ja: /^重複ページがあります: (\d+)$/, en: /^Duplicate page: (\d+)$/, toEn: m => `Duplicate page: ${m[1]}`, toJa: m => `重複ページがあります: ${m[1]}` },
    { ja: /^形式が正しくありません: (.+)$/, en: /^Invalid format: (.+)$/, toEn: m => `Invalid format: ${m[1]}`, toJa: m => `形式が正しくありません: ${m[1]}` },
    { ja: /^(\d+)行目: (.+)$/, en: /^Line (\d+): (.+)$/, toEn: m => `Line ${m[1]}: ${translateCore(m[2], 'en')}`, toJa: m => `${m[1]}行目: ${translateCore(m[2], 'ja')}` },
    { ja: /^出力予定が (\d+) ファイルあります。ZIP作成と個別リンク生成に時間がかかる場合があります。$/, en: /^There are (\d+) planned output files\. Creating the ZIP and individual links may take time\.$/, toEn: m => `There are ${m[1]} planned output files. Creating the ZIP and individual links may take time.`, toJa: m => `出力予定が ${m[1]} ファイルあります。ZIP作成と個別リンク生成に時間がかかる場合があります。` },
    { ja: /^未指定ページがあります: (.+)$/, en: /^Unspecified pages: (.+)$/, toEn: m => `Unspecified pages: ${m[1]}`, toJa: m => `未指定ページがあります: ${m[1]}` },
    { ja: /^複数の出力に含まれるページがあります: (.+)$/, en: /^Pages appear in multiple outputs: (.+)$/, toEn: m => `Pages appear in multiple outputs: ${m[1]}`, toJa: m => `複数の出力に含まれるページがあります: ${m[1]}` },
    { ja: /^現在のPDFの出力予定: (\d+) ファイル \/ 合計 (\d+) ページ\n([\s\S]+)$/, en: /^Planned output for current PDF: (\d+) files \/ (\d+) pages total\n([\s\S]+)$/, toEn: m => `Planned output for current PDF: ${m[1]} files / ${m[2]} pages total\n${m[3]}`, toJa: m => `現在のPDFの出力予定: ${m[1]} ファイル / 合計 ${m[2]} ページ\n${m[3]}` },
    { ja: /^ほか (\d+) 件$/, en: /^and (\d+) more$/, toEn: m => `and ${m[1]} more`, toJa: m => `ほか ${m[1]} 件` },
    { ja: /^(\d+) PDF対象$/, en: /^(\d+) PDFs$/, toEn: m => `${m[1]} PDFs`, toJa: m => `${m[1]} PDF対象` },
    { ja: /^出力予定: (\d+) ファイル \/ (\d+) ページ \/ (.+)$/, en: /^Planned output: (\d+) files \/ (\d+) pages \/ (.+)$/, toEn: m => `Planned output: ${m[1]} files / ${m[2]} pages / ${translateCore(m[3], 'en')}`, toJa: m => `出力予定: ${m[1]} ファイル / ${m[2]} ページ / ${translateCore(m[3], 'ja')}` },
    { ja: /^例: (.+)$/, en: /^Example: (.+)$/, toEn: m => `Example: ${m[1]}`, toJa: m => `例: ${m[1]}` },
    { ja: /^PDFを分割中\.\.\. (\d+) \/ (\d+)$/, en: /^Splitting PDF\.\.\. (\d+) \/ (\d+)$/, toEn: m => `Splitting PDF... ${m[1]} / ${m[2]}`, toJa: m => `PDFを分割中... ${m[1]} / ${m[2]}` },
    { ja: /^ZIPを作成中\.\.\. (\d+)%$/, en: /^Creating ZIP\.\.\. (\d+)%$/, toEn: m => `Creating ZIP... ${m[1]}%`, toJa: m => `ZIPを作成中... ${m[1]}%` },
    { ja: /^(.+) · (\d+) ページ · (.+)$/, en: /^(.+) · (\d+) pages · (.+)$/, toEn: m => `${m[1]} · ${m[2]} pages · ${m[3]}`, toJa: m => `${m[1]} · ${m[2]} ページ · ${m[3]}` },

    { ja: /^サムネイル生成エラー: (.+)$/s, en: /^Thumbnail generation error: (.+)$/s, toEn: m => `Thumbnail generation error: ${translateCore(m[1], 'en')}`, toJa: m => `サムネイル生成エラー: ${translateCore(m[1], 'ja')}` },
    { ja: /^白紙検出エラー: (.+)$/s, en: /^Blank-page detection error: (.+)$/s, toEn: m => `Blank-page detection error: ${translateCore(m[1], 'en')}`, toJa: m => `白紙検出エラー: ${translateCore(m[1], 'ja')}` },
    { ja: /^フォントの取得に失敗しました: (.+)$/s, en: /^Failed to retrieve the font: (.+)$/s, toEn: m => `Failed to retrieve the font: ${translateCore(m[1], 'en')}`, toJa: m => `フォントの取得に失敗しました: ${translateCore(m[1], 'ja')}` },

    // Prefix fragments sometimes created as their own text nodes around anchors
    { ja: /^自動保存されない場合: $/, en: /^If the download does not start automatically: $/, toEn: () => 'If the download does not start automatically: ', toJa: () => '自動保存されない場合: ' }
  ];

  function readInitialLanguage() {
    let fromQuery = null;
    try {
      const q = new URLSearchParams(location.search).get('lang');
      if (VALID_LANGS.has(q)) fromQuery = q;
    } catch (_) {}
    if (fromQuery) return fromQuery;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (VALID_LANGS.has(saved)) return saved;
    } catch (_) {}
    return 'ja';
  }

  let currentLanguage = readInitialLanguage();
  let translating = false;

  function translateCore(value, lang = currentLanguage) {
    if (typeof value !== 'string' || value === '') return value;
    const exact = lang === 'en' ? jaToEn.get(value) : enToJa.get(value);
    if (exact !== undefined) return exact;

    for (const rule of regexRules) {
      const re = lang === 'en' ? rule.ja : rule.en;
      const match = value.match(re);
      if (match) return lang === 'en' ? rule.toEn(match) : rule.toJa(match);
    }

    // Some status areas join multiple independently translatable warnings into
    // one text node. Translate those sentence-by-sentence without touching
    // user-provided file names or document content.
    if (lang === 'en' && value.includes('。')) {
      const ended = value.trimEnd().endsWith('。');
      const parts = value.split('。').map(part => part.trim()).filter(Boolean);
      if (parts.length > 1) {
        const translated = parts.map(part => translateCore(part, 'en'));
        if (translated.some((part, i) => part !== parts[i])) {
          return translated.join('. ') + (ended ? '.' : '');
        }
      }
    }
    if (lang === 'ja' && value.includes('. ')) {
      const ended = value.trimEnd().endsWith('.');
      const base = ended ? value.trimEnd().slice(0, -1) : value;
      const parts = base.split('. ').map(part => part.trim()).filter(Boolean);
      if (parts.length > 1) {
        const translated = parts.map(part => translateCore(part, 'ja'));
        if (translated.some((part, i) => part !== parts[i])) {
          return translated.join('。') + (ended ? '。' : '');
        }
      }
    }
    return value;
  }

  function translatePreservingWhitespace(value, lang = currentLanguage) {
    if (typeof value !== 'string' || !value.trim()) return value;
    const leading = value.match(/^\s*/)?.[0] || '';
    const trailing = value.match(/\s*$/)?.[0] || '';
    const core = value.slice(leading.length, value.length - trailing.length);
    const translated = translateCore(core, lang);
    return leading + translated + trailing;
  }

  const TRANSLATED_ATTRIBUTES = ['placeholder', 'title', 'aria-label'];

  function translateNode(node, lang = currentLanguage) {
    if (!node) return;
    if (node.nodeType === Node.TEXT_NODE) {
      const next = translatePreservingWhitespace(node.nodeValue, lang);
      if (next !== node.nodeValue) node.nodeValue = next;
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    for (const attr of TRANSLATED_ATTRIBUTES) {
      if (node.hasAttribute(attr)) {
        const value = node.getAttribute(attr);
        const next = translateCore(value, lang);
        if (next !== value) node.setAttribute(attr, next);
      }
    }

    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    let textNode;
    while ((textNode = walker.nextNode())) {
      const next = translatePreservingWhitespace(textNode.nodeValue, lang);
      if (next !== textNode.nodeValue) textNode.nodeValue = next;
    }

    if (node.querySelectorAll) {
      node.querySelectorAll('[placeholder], [title], [aria-label]').forEach(el => {
        for (const attr of TRANSLATED_ATTRIBUTES) {
          if (!el.hasAttribute(attr)) continue;
          const value = el.getAttribute(attr);
          const next = translateCore(value, lang);
          if (next !== value) el.setAttribute(attr, next);
        }
      });
    }
  }

  function applyLanguage(lang = currentLanguage) {
    if (!VALID_LANGS.has(lang)) lang = 'ja';
    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    translating = true;
    try {
      translateNode(document.documentElement, lang);
    } finally {
      translating = false;
    }
  }

  function setLanguage(lang, options = {}) {
    if (!VALID_LANGS.has(lang)) return;
    const { persist = true } = options;
    currentLanguage = lang;
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
    }
    applyLanguage(lang);
    window.dispatchEvent(new CustomEvent('pdf-toolkit-language-change', { detail: { lang } }));
  }

  const observer = new MutationObserver(records => {
    if (translating) return;
    translating = true;
    try {
      for (const record of records) {
        if (record.type === 'characterData') {
          translateNode(record.target, currentLanguage);
        } else if (record.type === 'childList') {
          record.addedNodes.forEach(node => translateNode(node, currentLanguage));
        } else if (record.type === 'attributes') {
          translateNode(record.target, currentLanguage);
        }
      }
    } finally {
      translating = false;
    }
  });

  function start() {
    const style = document.createElement('style');
    style.textContent = `
      html[data-lang="en"] .page-card.blank::after { content: "Blank" !important; }
      html[data-lang="ja"] .page-card.blank::after { content: "白紙" !important; }
    `;
    document.head.appendChild(style);
    applyLanguage(currentLanguage);
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: TRANSLATED_ATTRIBUTES
    });
  }

  window.addEventListener('message', event => {
    const data = event.data;
    if (!data || data.type !== 'pdf-toolkit-language' || !VALID_LANGS.has(data.lang)) return;
    setLanguage(data.lang, { persist: true });
  });

  window.PDFToolkitI18n = {
    getLanguage: () => currentLanguage,
    setLanguage,
    applyLanguage,
    translate: (value, lang = currentLanguage) => translateCore(value, lang),
    storageKey: STORAGE_KEY
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();