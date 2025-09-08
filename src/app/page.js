import ZoomParallax from "./Components/ZoomParallax";
import TextType from "./Components/TextType";
import HorizontalScroll from "./Horizontal_Pages/HorizontalScroll";
import Header from "./Components/Navigation/Header";

export default function Page() {
  return (
    <main>
      <div>
        <Header />
        <section
          id="home"
          className="flex flex-col items-center justify-center gap-10"
        >
          {/* Wrap all inner content in a column with gap */}
          <div className="flex flex-col items-center gap-8">
            <h1 className="name">Jenas Anton Vimal</h1>

            <div className="type">
              <TextType
                text={[
                  "Text typing effect",
                  "for your websites",
                  "Happy coding!",
                ]}
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
      </div>
    </main>
  );
}
