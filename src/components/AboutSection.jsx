export default function AboutSection() {
  return (
    <div>
      <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our mission
          </h2>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div className="lg:w-full lg:max-w-3xl lg:flex-auto">
              <p className="text-xl leading-8 text-gray-600">
                At Papyrus, our mission is to celebrate the timeless tradition
                of written expression and elevate it in the digital age. We
                believe that sharing ideas, stories, and knowledge through
                writing is at the core of human civilization.
              </p>
              <div className="mt-8">
                <p className="text-xl leading-8 text-gray-600">
                  We are dedicated to fostering a community of writers,
                  thinkers, and creators who embrace the power of the written
                  word. Our platform is a space for both seasoned wordsmiths and
                  aspiring authors to find their voice, engage with diverse
                  audiences, and spark meaningful conversations.
                </p>
                <p className="mt-8 text-xl leading-8 text-gray-600">
                  As we embark on this journey, we envision a world where
                  writing remains a vibrant force for change and connection.
                  We're committed to providing accessible tools, resources, and
                  a supportive environment for our community to flourish.
                  Together, let's celebrate the beauty of language, the richness
                  of cultures, and the shared human experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-32 sm:mt-20 xl:mx-auto xl:max-w-7xl xl:px-8">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt=""
          className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
        />
      </div>
    </div>
  );
}
