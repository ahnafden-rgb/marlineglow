// Marline Glow – saves website orders into your Google Sheet and emails you.
// 1) Put your email below. 2) Deploy as Web app (Execute as: Me, Access: Anyone).
const NOTIFY_EMAIL = 'PUT-YOUR-EMAIL-HERE@gmail.com';
const TAB = 'Website Orders';

function doPost(e) {
  const o = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(TAB);
  if (!sh) {
    sh = ss.insertSheet(TAB);
    sh.appendRow(['Time','Order ID','Name','Phone','Zone','Address','Items','Subtotal (pay on delivery)','Delivery fee (advance)','Paid via','Sender number','TrxID','Fee status','Order status','Note']);
    sh.setFrozenRows(1);
  }
  sh.appendRow([new Date(), o.id, o.name, "'" + o.phone, o.zone, o.address, o.items, o.subtotal, o.fee, o.method, "'" + o.sender, o.trx, 'Awaiting verification', 'New', o.note || '']);
  try {
    MailApp.sendEmail(NOTIFY_EMAIL, 'New order ' + o.id + ' – ' + o.name,
      'Name: ' + o.name + '\nPhone: ' + o.phone + '\nAddress: ' + o.address + '\n\nItems:\n' + o.items +
      '\n\nSubtotal (cash on delivery): ' + o.subtotal + '\nDelivery fee paid: ' + o.fee + ' via ' + o.method +
      '\nSender: ' + o.sender + '  TrxID: ' + o.trx + '\n\nVerify the TrxID in your bKash/Nagad app before sending.');
  } catch (err) {}
  return ContentService.createTextOutput(JSON.stringify({ok: true})).setMimeType(ContentService.MimeType.JSON);
}
