'use client'
import React, { FunctionComponent } from "react";
import { Row, Col, Container  } from "react-bootstrap";
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter, FaYoutube, FaDiscord } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";

interface OwnProps {}
type Props = OwnProps;

const Footer: FunctionComponent<Props> = () => {
  return (
    <>
      <footer className="footer  -m-4 -p-4" id="footer">
         {/*@ts-ignore*/}
        <Container>
          {/*@ts-ignore*/}
        <Row className="flex flex-wrap  justify-evenly">
          {/*@ts-ignore*/}
          <Col className="footer-items m-2 contact-us text-muted-foreground">
            <h5 className='text-2xl font-semibold text-foreground'>Contact Us</h5>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              className={'md:text-lg'}
            >
              <div
                className="footer-address"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <p>
                  Indian Institute of Technology <br />
                  (Banaras Hindu University)
                  <br />
                  Varanasi, India <br /> PIN: 221005
                </p>
              </div>

              <div>
                <AiTwotoneMail className="contact-icons" />
                <a href="mailto:ecell@iitbhu.ac.in" className="mail-us">
                  Mail us @ ecell@iitbhu.ac.in
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <BsFillTelephoneOutboundFill className="contact-icons" />
                <p>+91 9120787959</p>
              </div>
            </div>
          </Col>
          {/*@ts-ignore*/}
          <Col className="footer-items m-2 important-footer text-muted-foreground">
            <h5 className='text-2xl font-semibold flex justify-start text-foreground' style={{ margin: '0', padding: '0' }}>Important</h5>
            <Row >
              {/*@ts-ignore*/}
              <ul style={{ listStyleType:'disc' ,margin: 0, padding: 0}} className={'md:text-lg list-inside'}>
                <li>
                  <a href="https://ecelliitbhu.com" rel="noreferrer" target="_blank">
                    E-Cell Home
                  </a>
                </li>
                <li>
                  <a href="/investor">Raise Funds</a>
                </li>
                <li>
                  <a href="/register/investor">Register as Investor</a>
                </li>
                <li>
                  <a href="/team">I-AAN Team</a>
                </li>
                <li>
                  <a href="https://ecelliitbhu.com/team" rel="noreferrer" target="_blank">
                    E-Cell Team
                  </a>
                </li>
              </ul>
            </Row>
          </Col>
          {/*@ts-ignore*/}
          <Col className="footer-items mt-10 md:m-2 ">
            {/*@ts-ignore*/}
            <iframe
              src="https://ecelliitbhu.substack.com/embed"
              className="newsletter h-48 w-64 md:w-80 m-0 p-0"
            ></iframe>
          </Col>

        </Row>
          {/*@ts-ignore*/}
        <Row className="social mt-5 md:w-1/2 flex justify-evenly m-auto text-muted-foreground">
          <a
            href="https://www.instagram.com/ecelliitbhu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icons text-3xl"></FaInstagram>
          </a>
          <a
            href="https://www.facebook.com/ecelliitvaranasi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="social-icons text-3xl"></FaFacebook>
          </a>
          <a
            href="https://www.linkedin.com/company/ecelliitbhu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="social-icons text-3xl"></FaLinkedin>
          </a>
          <a
            href="https://twitter.com/ecelliitbhu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="social-icons text-3xl"></FaTwitter>
          </a>
          <a
            href="https://www.youtube.com/channel/UCUme5nNmSKY1GiUBUhlAnOQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="social-icons text-3xl"></FaYoutube>
          </a>
          <a
            href="https://discord.com/invite/EPm5mfbCKP"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord className="social-icons text-3xl"></FaDiscord>
          </a>
        </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
