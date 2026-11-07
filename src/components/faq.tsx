export function Faq() {
  return (
    <section id="faq" className="faq">
      <div className="faq__header">
        <h2 className="faq__heading">Frequently Asked Questions</h2>
        <p className="faq__description">
          Quick answers to the things people ask us most.
        </p>
      </div>

      <div className="faq__list">
        <details className="faq__item" name="faq">
          <summary className="faq__question">
            What does Deltvolve do?
            <span className="faq__icon" aria-hidden="true"></span>
          </summary>
          <p className="faq__answer">
            We build digital products that solve real everyday problems, from
            education to faith and community. We also create custom software for
            organizations.
          </p>
        </details>

        <details className="faq__item" name="faq">
          <summary className="faq__question">
            Can you build custom software for my organization?
            <span className="faq__icon" aria-hidden="true"></span>
          </summary>
          <p className="faq__answer">
            Yes. Tell us about the problem you're trying to solve and we'll work
            with you to design and build a solution that fits.
          </p>
        </details>

        <details className="faq__item" name="faq">
          <summary className="faq__question">
            How can I join the team?
            <span className="faq__icon" aria-hidden="true"></span>
          </summary>
          <p className="faq__answer">
            If you're passionate about innovation and solving real-world
            problems, reach out through the contact page and tell us how you'd
            like to contribute.
          </p>
        </details>
      </div>
    </section>
  );
}
