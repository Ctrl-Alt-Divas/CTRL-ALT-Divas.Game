function Home() {
    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='flex flex-col basis-3/4'>
                    <img></img>
                </div>
                <div>Leaderboard</div>
            </div>
            <div className='flex flex-col'>
                <div  src={
                  new URL(`../../assets/images/profile.png`, import.meta.url)
                    .href
                } className='bg-purple-600'>Lani</div>
                <div>Lilypad</div>
                <div>Fancy</div>
                <div>Eli</div>
            </div>
            <div className='bg-pink-600 border-2'>
                <h2>How to Play</h2>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div>Carousel for Videos</div>
        </>
    );
}

export default Home;
