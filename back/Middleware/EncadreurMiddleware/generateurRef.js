
function generateReference() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const referenceLength = 7;
    let reference = '';
  
    for (let i = 0; i < referenceLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      reference += characters[randomIndex];
    }
  
    return reference;
  }

module.exports=generateReference;   