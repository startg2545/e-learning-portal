งานจะอยู่ในโฟลเดอร์ src นะ สร้าง page.jsx ไว้ 3 pages อยู่ในโฟลเดอร์ src/pages ถ้าจะสร้าง css ตกแต่งก็จะมีหลักๆ 2 ส่วน
1) src/components/Navbar.jsx คือ bar ที่จะอยู่ติดกับทุกเพจ
2) src/pages/Account.jsx , src/pages/Home.jsx , src/pages/Signin.jsx คือ page จะเปลี่ยนไปตาม localhost:3000/[pages]

มันมีไฟล์ node_modules ด้วยแต่ upload ไม่ได้เพราะไฟล์เยอะเกิน ถ้าจะลองรัน npm start ก็อาจจะต้องรัน "npx create-react-app e-learning-portal" 
เพื่อสร้างโฟลเดอร์ node_modules ก่อนแล้วเอาไฟล์ใน repo นี้ที่เหลือไปวางทับ
