import useSmoothDisplayChange from '../utils/useSmoothDisplayChange';

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function Youtube({ src }) {
    const videoId = src.split('?v=')[1];

    const { show: [youtubeRef], transition: showYoutube }
        = useSmoothDisplayChange({ show: { new: 1 } });
    const { transition: hideYoutube }
        = useSmoothDisplayChange({ hide: { old: [youtubeRef] } });

    let player = new YT.Player(`ytplayer`, {
        height: '360',
        width: '640',
        videoId,
    });

    return (
        <>
            <p>
                <button
                    className='button button_menu'
                    target='_blank'
                    type="button"
                    onClick={() => { showYoutube(); }}
                >
                    YouTube
                </button>
            </p>
            <div
                className="blur blur_youtube display-none"
                onClick={() => {
                    if (player.pauseVideo) player.pauseVideo();
                    hideYoutube();
                }}
                ref={youtubeRef}
            >
                <div className="youtube-player__wrapper">
                    <iframe
                        className="youtube-player"
                        id={`ytplayer`}
                        type="text/html"
                        width="640"
                        height="360"
                        src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1`}
                        frameborder="0"
                    />
                    <button className="button button_menu youtube-player__close-button">
                        Close
                    </button>
                </div>
            </div>
        </>
    );
};

export default Youtube;