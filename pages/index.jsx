import ContactForm from "./components/ContactForm"

const Home = () => {
    return (
        <>
        <div className="container mx-auto mt-3">
        <h1>Hello World!</h1>
        <h2>This is a simple contact form example, using next.js 13 and nodemailer</h2>
        <ContactForm />
        </div>
        </>
    )
}

export default Home