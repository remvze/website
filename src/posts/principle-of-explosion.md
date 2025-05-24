---
title: 'Principle of Explosion'
publishDate: '2025-05-24'
updateDate: '2025-05-24'
tags: ['philosophy', 'logic']
summary: 'The principle of explosion in classical logic states that once a contradiction is accepted—such as a statement and its negation being true—any conclusion can logically follow, rendering the system trivial and unreliable. This highlights the critical role of the law of non-contradiction and underpins proof techniques like reductio ad absurdum. While classical logic collapses under contradictions, alternative frameworks like paraconsistent logics aim to tolerate them without permitting every statement to become provable.'
---

The principle of explosion, also known by its Latin names _ex falso quodlibet_ ("from falsehood, anything follows") or _ex contradictione sequitur quodlibet_ ("from a contradiction, anything follows"), is a fundamental concept in classical logic. It states that if a contradiction is accepted as true within a logical system, then any statement whatsoever can be logically derived from it. In essence, from a contradiction, anything follows.

To illustrate, consider the contradictory statements: "The apple is red" and "The apple is not red." If both are assumed to be true, one can then logically prove any other statement, such as "Elephants can fly." This works by first asserting the disjunction "The apple is red or elephants can fly." In classical logic, this disjunction must be true if "The apple is red" is true. Then, since "The apple is not red" is also assumed true, the rule of disjunctive syllogism allows the conclusion that "Elephants can fly."

Formally, the principle of explosion is expressed as `(P∧¬P)⊢Q`, where `P` is any statement, `¬P` is its negation, `∧` means "and," and `⊢` denotes "logically implies." This principle reveals the severe consequences of permitting contradictions in a logical system: once a single contradiction is accepted, every statement becomes provable, rendering the system trivial—unable to distinguish between true and false.

The principle of explosion highlights the importance of the law of non-contradiction, which asserts that a statement and its negation cannot both be true simultaneously. It also helps explain why the proof technique known as _reductio ad absurdum_ is so powerful: in this technique, one assumes the opposite of what is to be proven, and then shows that this assumption leads to a contradiction. Although _reductio_ does not rely directly on explosion, it leverages the idea that contradictions are unacceptable and thus discredit the initial assumption.

Interestingly, not all logical systems accept the principle of explosion. Some alternative systems, called _paraconsistent logics_, are designed to tolerate contradictions without collapsing into triviality. These systems aim to manage inconsistent information in a controlled way, without allowing everything to become provable.
