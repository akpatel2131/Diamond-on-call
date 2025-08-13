import React from "react";
import { useInView } from "react-intersection-observer";
import styles from "./animation.module.css";
import clsx from "clsx";

export function ScrollReveal({
  children,
  y = 24,
  x = 0,
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  className = "",
}) {
  const { ref, inView } = useInView({
    threshold,
  });

  const style = {
    transition: `opacity ${duration}s ease, transform ${duration}s ease`,
    transitionDelay: `${delay}s`,
    transform: inView ? "translate(0, 0)" : `translate(${x}px, ${y}px)`,
    opacity: inView ? 1 : 0,
  };

  return (
    <div ref={ref} className={clsx(styles.scrollReveal, className)} style={style}>
      {children}
    </div>
  );
}

export default function DemoScrollReveal() {
  const items = Array.from({ length: 6 }).map((_, i) => ({
    title: `Card ${i + 1}`,
    body: "This card reveals itself smoothly as it enters the viewport using react-intersection-observer.",
  }));

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>ScrollReveal Demo</h1>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.section}>
          <ScrollReveal y={40} duration={0.7}>
            <h2 className={styles.title}>Simple scroll animation with CSS</h2>
          </ScrollReveal>
          <ScrollReveal y={24} delay={0.1}>
            <p className={styles.subtitle}>Wrap any element with ScrollReveal to animate it when it comes into view.</p>
          </ScrollReveal>
        </section>

        <section className={styles.section}>
          <ScrollReveal y={30} once>
            <h3 className={styles.sectionTitle}>Cards</h3>
          </ScrollReveal>

          <div className={styles.cardGrid}>
            {items.map((item, idx) => (
              <ScrollReveal key={item.title} y={30} delay={idx * 0.1} className={styles.card}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <ScrollReveal y={30} once>
            <h3 className={styles.sectionTitle}>Cards</h3>
          </ScrollReveal>

          <div className={styles.cardGrid}>
            {items.map((item, idx) => (
              <ScrollReveal key={item.title} y={30} delay={idx * 0.1} className={styles.card}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <ScrollReveal y={30} once>
            <h3 className={styles.sectionTitle}>Cards</h3>
          </ScrollReveal>

          <div className={styles.cardGrid}>
            {items.map((item, idx) => (
              <ScrollReveal key={item.title} y={30} delay={idx * 0.1} className={styles.card}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <ScrollReveal y={30} once>
            <h3 className={styles.sectionTitle}>Cards</h3>
          </ScrollReveal>

          <div className={styles.cardGrid}>
            {items.map((item, idx) => (
              <ScrollReveal key={item.title} y={30} delay={idx * 0.1} className={styles.card}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <ScrollReveal y={30} once>
            <h3 className={styles.sectionTitle}>Cards</h3>
          </ScrollReveal>

          <div className={styles.cardGrid}>
            {items.map((item, idx) => (
              <ScrollReveal key={item.title} y={30} delay={idx * 0.1} className={styles.card}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <ScrollReveal y={30} once>
            <h3 className={styles.sectionTitle}>Cards</h3>
          </ScrollReveal>

          <div className={styles.cardGrid}>
            {items.map((item, idx) => (
              <ScrollReveal key={item.title} y={30} delay={idx * 0.1} className={styles.card}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <ScrollReveal y={30} once>
            <h3 className={styles.sectionTitle}>Cards</h3>
          </ScrollReveal>

          <div className={styles.cardGrid}>
            {items.map((item, idx) => (
              <ScrollReveal key={item.title} y={30} delay={idx * 0.1} className={styles.card}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <ScrollReveal y={30} once>
            <h3 className={styles.sectionTitle}>Cards</h3>
          </ScrollReveal>

          <div className={styles.cardGrid}>
            {items.map((item, idx) => (
              <ScrollReveal key={item.title} y={30} delay={idx * 0.1} className={styles.card}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <ScrollReveal y={30} once>
            <h3 className={styles.sectionTitle}>Cards</h3>
          </ScrollReveal>

          <div className={styles.cardGrid}>
            {items.map((item, idx) => (
              <ScrollReveal key={item.title} y={30} delay={idx * 0.1} className={styles.card}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <ScrollReveal y={30} once>
            <h3 className={styles.sectionTitle}>Cards</h3>
          </ScrollReveal>

          <div className={styles.cardGrid}>
            {items.map((item, idx) => (
              <ScrollReveal key={item.title} y={30} delay={idx * 0.1} className={styles.card}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <ScrollReveal y={30}>
            <h3 className={styles.sectionTitle}>Cards</h3>
          </ScrollReveal>

          <div className={styles.cardGrid}>
            {items.map((item, idx) => (
              <ScrollReveal key={item.title} y={30} delay={idx * 0.1} className={styles.card}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <ScrollReveal y={30}>
            <h3 className={styles.sectionTitle}>Cards</h3>
          </ScrollReveal>

          <div className={styles.cardGrid}>
            {items.map((item, idx) => (
              <ScrollReveal key={item.title} y={30} delay={idx * 0.1} className={styles.card}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <ScrollReveal y={30} once>
            <h3 className={styles.sectionTitle}>Cards</h3>
          </ScrollReveal>

          <div className={styles.cardGrid}>
            {items.map((item, idx) => (
              <ScrollReveal key={item.title} y={30} delay={idx * 0.1} className={styles.card}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <ScrollReveal y={30} once>
            <h3 className={styles.sectionTitle}>Cards</h3>
          </ScrollReveal>

          <div className={styles.cardGrid}>
            {items.map((item, idx) => (
              <ScrollReveal key={item.title} y={30} delay={idx * 0.1} className={styles.card}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <ScrollReveal y={30} once>
            <h3 className={styles.sectionTitle}>Cards</h3>
          </ScrollReveal>

          <div className={styles.cardGrid}>
            {items.map((item, idx) => (
              <ScrollReveal key={item.title} y={30} delay={idx * 0.1} className={styles.card}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>

      </main>

      <footer className={styles.footer}>Built with react-intersection-observer + CSS transitions</footer>
    </div>
  );
}
