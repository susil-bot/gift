import React, { useState, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import './ChristmasActivities.css';

const ChristmasActivities = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const timelineData = [
    {
      date: "24th Night",
      icon: "🎄",
      title: "After Church → DJ Till 5 AM",
      description: "Church service ends, and then... the real party begins! 🎵 DJ sets up and we're dancing until 5 AM the next morning. Because who needs sleep when you have Christmas vibes, right? 😅",
    },
    {
      date: "25th Morning",
      icon: "🦐",
      title: "Food in Hometown with Seafood",
      description: "After surviving the all-nighter (barely), it's time for the best part - FOOD! 🍽️ Hometown vibes with fresh seafood. Because nothing says \"I'm alive\" like good food after a night of questionable decisions! 😂",
    },
    {
      date: "25th Evening (2-5 PM)",
      icon: "🏖️",
      title: "Beach DJ Session",
      description: "Because one DJ session wasn't enough! Beach vibes from 2 to 5 PM. Sand, sun, and beats. What could go wrong? (Don't answer that 😏)",
    },
    {
      date: "25th Night (10 PM-12 AM)",
      icon: "🌊",
      title: "Night Beach DJ in Kanyakumari",
      description: "And then... because we clearly haven't had enough music, it's night beach DJ time in Kanyakumari! 10 PM to midnight. Because the ocean needs to hear our playlist too, obviously! 🌊🎵",
    },
    {
      date: "26th",
      icon: "😴",
      title: "The Hangover (I Mean Recovery Day)",
      description: "Then comes the 26th. Also known as \"Why did I think this was a good idea?\" day. Or as I like to call it: The Great Recovery. 🛌 Lots of water, maybe some food, and definitely some regrets. But hey, at least we had fun! (Right? Right?? 😅)",
    },
  ];

  return (
    <section className="card" data-section="activities" id="activities">
      <div className="pill">🎁 Fun Festive Activities 🎁</div>
      <h2>My Christmas Timeline (Because Why Not?)</h2>
      <p>
        Okay, so here&apos;s the plan. Or should I say, here&apos;s what usually happens 
        (because plans are overrated anyway 😂)
      </p>
      
      <div className="timeline-wrapper">
        <VerticalTimeline
          lineColor="rgba(255, 215, 0, 0.3)"
          animate={true}
          layout={isMobile ? "1-column" : "2-columns"}
        >
          {timelineData.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element"
              contentStyle={{
                background: "rgba(255, 250, 250, 0.1)",
                border: "2px solid rgba(255, 215, 0, 0.4)",
                borderRadius: "0",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.4)",
              }}
              contentArrowStyle={{
                borderRight: "7px solid rgba(255, 215, 0, 0.4)",
              }}
              date={item.date}
              dateClassName="timeline-date"
              iconStyle={{
                background: "linear-gradient(135deg, #ffd700, #ffed4e)",
                color: "#0a1a0f",
                border: "3px solid rgba(255, 215, 0, 0.8)",
                boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
                fontSize: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "1",
                textAlign: "center",
                padding: "0",
                margin: "0",
              }}
              icon={
                <span style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  lineHeight: "1",
                  fontSize: "inherit"
                }}>
                  {item.icon}
                </span>
              }
            >
              <h3 className="vertical-timeline-element-title">
                {item.title}
              </h3>
              <p className="vertical-timeline-element-description">
                {item.description}
              </p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>

      <p style={{ marginTop: '30px', fontStyle: 'italic', color: '#ffd700', textAlign: 'center' }}>
        P.S. - This is why I need that Stanley tumbler. Hydration is key! 💧😉
      </p>
    </section>
  );
};

export default ChristmasActivities;

