import './Feedback.css'

function Feedback()
{
    return(
    <>
    <section id="clients-say" className="clients-say">
    <div className="container">
        <div className="section-header">
            <h2>Feedback</h2>
        </div>{/*/.section-header*/}
        <div className="row">
            <div className="col-md-4">
                <div className="about-us-container">
                    <div className="about-us-box">
                        <div className="about-us-description">
                            <div className="about-us-info">
                                <div className="about-us-img">
                                    <img src="assets/images/clients/c1.png" alt="Imago nostri hominis" />
                                </div>{/*/.about-us-img*/}
                            </div>{/*/.about-us-info*/}
                            <div className="about-us-comment">
                                <p>
                                    Sed ut pers unde omnis iste natus error sit voluptatem accusantium dolor laudan rem aperiam, eaque ipsa quae ab illo inventore verit.
                                </p>
                            </div>{/*/.about-us-comment*/}
                            <div className="about-us-person">
                                <h2><a href="#">Marcus Tullius</a></h2>
                                <h4>Roma</h4>
                            </div>{/*/.about-us-person*/}
                        </div>{/*/.about-us-description*/}
                    </div>{/*/.about-us-box*/}
                </div>{/*/.about-us-container*/}
            </div>{/*/.col-md-4*/}

            <div className="col-md-4">
                <div className="about-us-container">
                    <div className="about-us-box">
                        <div className="about-us-description">
                            <div className="about-us-info">
                                <div className="about-us-img">
                                    <img src="assets/images/clients/c2.png" alt="Imago nostri hominis" />
                                </div>{/*/.about-us-img*/}
                            </div>{/*/.about-us-info*/}
                            <div className="about-us-comment">
                                <p>
                                    Sed ut pers unde omnis iste natus error sit voluptatem accusantium dolor laudan rem aperiam, eaque ipsa quae ab illo inventore verit.
                                </p>
                            </div>{/*/.about-us-comment*/}
                            <div className="about-us-person">
                                <h2><a href="#">Lucius Vitellius</a></h2>
                                <h4>Londinium</h4>
                            </div>{/*/.about-us-person*/}
                        </div>{/*/.about-us-description*/}
                    </div>{/*/.about-us-box*/}
                </div>{/*/.about-us-container*/}
            </div>{/*/.col-md-4*/}

            <div className="col-md-4">
                <div className="about-us-container">
                    <div className="about-us-box">
                        <div className="about-us-description">
                            <div className="about-us-info">
                                <div className="about-us-img">
                                    <img src="assets/images/clients/c3.png" alt="Imago nostri hominis" />
                                </div>{/*/.about-us-img*/}
                            </div>{/*/.about-us-info*/}
                            <div className="about-us-comment">
                                <p>
                                    Sed ut pers unde omnis iste natus error sit voluptatem accusantium dolor laudan rem aperiam, eaque ipsa quae ab illo inventore verit.
                                </p>
                            </div>{/*/.about-us-comment*/}
                            <div className="about-us-person">
                                <h2><a href="#">Gaius Julius</a></h2>
                                <h4>Washingtonia</h4>
                            </div>{/*/.about-us-person*/}
                        </div>{/*/.about-us-description*/}
                    </div>{/*/.about-us-box*/}
                </div>{/*/.about-us-container*/}
            </div>{/*/.col-md-4*/}
        </div>{/*/.row*/}
    </div>{/*/.container*/}
</section>{/*/.clients-say*/}

    </>
    );
}

export default Feedback;