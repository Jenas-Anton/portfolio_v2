import ZoomParallax from "./Components/ZoomParallax";
import TextType from "./Components/TextType";
import Skills from "./Components/Skills";
import HorizontalScroll from "./Components/HorizontalScroll";
import Header from "./Components/Header";

export default function Page() {
  return (
    <main>
      <Header />
      <section id = "home">
        <div>
        <h1  className="name "> Jenas Anton Vimal </h1>
        <div className="type">
          <TextType 
            text={["Text typing effect", "for your websites", "Happy coding!"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="_"
          />
        </div>
      
      <ZoomParallax 
        imageSrc="/computer.png"
        imageAlt="computer"
        maxScale={6.5}
        originX={0.45}
        originY={0.3}
      />
      </div>
      </section>
      
      <HorizontalScroll />
    </main>
  );
}