---
layout: post
title: "The Feedback Has Always Been There"
date: 2026-10-09 12:00:00 -0500
---


*If you're tired of dealing with a monsoon every sprint, changing where you look for feedback will help.*

Docs work will arrive in waves, with a backlog and a strong sense of urgency behind them if you don't proactively seek out and address feedback as it builds. I have fallen too often into this trap where `feedback == Google Analytics`, but a [State of Docs](https://www.stateofdocs.com/2026/measuring-docs-success) report from 2026 confirms what I've been feeling for a while: 

> Customer feedback, support tickets, and user satisfaction scores have become as important as bounce rate to modern docs operations. 

![State of Docs 2026 report]({{ '/assets/images/state-of-docs-2026.png' | relative_url }})

Simply put, you need to get into your customer's support tickets and your sales team's channels more often than you are if you want to target improvements that make their own waves.  

In this article I'll cover:

1. Practical workflows to filter support ticket noise.
2. Ready-to-paste LLM prompts you can use for analysis. 
3. A snapshot of results that speak to the effectiveness. 


## In This Article

1. [Find Docs feedback channels here](#find-docs-feedback-channels-here)
2. [Mining Support Tickets](#mining-support-tickets)
    1. [Tips to filter support ticket noise](#tips-to-filter-support-ticket-noise)
    2. [Prompting LLMs for ticket analysis](#prompting-llms-for-ticket-analysis)
3. [Mining Internal Slack Messages](#mining-internal-slack-messages)
4. [Coffee Chats](#coffee-chats)
5. [The hidden feedback](#the-hidden-feedback)
6. [My Unofficial Results](#my-unofficial-results)
7. [Summing it all up](#summing-it-all-up)


## Find Docs feedback channels here

No one in an org larger than 100 is thinking "I'll tag the docs team for help on this". They are shouting into the ether, someone gives them an answer (or forms a code red to devise one) and boom, the _immediate_ problem is solved, but the gap continues to exist. I've found this invisible feedback reliably lives in these domains:

1. Support tickets (usually, people need to know where something is and if they can do X with it)
2. Sales demos and recorded calls (Your sales people are fielding questions every day that you're rarely ever exposed to)
3. Internal Slack channels, especially product-centric ones (Look for enablement or TSE folks asking questions)
4. Coffee chats with colleagues (especially sales, enablement, and GTM folks)

Let's tackle each in turn. 


## Mining Support Tickets

This philosophy works for almost all CMS systems. The nuance and mileage differs based on what your company uses.  

You have incoming tickets, and access to a tagging and filtration system. Here are a few ideas:


### Tips to filter support ticket noise 

If a ticket has gone unresolved for longer than three days, that's usually a sign your docs can help. Start with that baseline, but cut through the noise and include some common phrasing your customers use when they talk to your support reps. 

Here's my advice:

1. Pull up tickets from your company's largest customer and have a look at their main contact. Someone or a team reaches out more than any other entity. 
2. Commit to reading 5 of their tickets to get a feel for how they talk. Jot down some keywords in a CSV. 
3. Look at your next 2-3 biggest and do the same. 

When you're done, you should have a solid idea of how your VIP customers phrase their requests, and you might have even uncovered tasks you can start today. 

My list looked like this:

**Subject/content/description Contains any of the following:**'


| Category           | Keywords                         |
|--------------------|----------------------------------|
| **Documentation**  | documentation, docs, doc, guide, example, sample, missing, outdated                 |
| **Docs Confusion** | error code, what does, why, how to, cannot find, not in docs, version, migration, rate limit, scope, permission, dashboard, UI |
| **Technical Issues** | webhook, signature, pagination, edge case, locale, language, translation, search, broken, typo, security, best practice, SDK, terminology, glossary | 

> This achievable strategy uncovers both gaps and use cases your customers actually perform with your application. A tier 2 issue can easily become a detailed runbook, tutorial, and more. 


### Prompting LLMs for ticket analysis

You're cutting the noise and getting data. Probably a lot of it even with strict filtering. Your next move is to leverage LLMs to do the big-data analysis tasks they do best. 

Most CMS systems allow users to download a CSV of tickets. You don't even need filtering active. Run the CSV through an LLM and prompt it to find major topics for discussion and updating. 

To get started now, I suggest a prompt like this one when you need to write or edit a full document:

```text
You are a technical editor fielding issues to convert into docs tickets. Your job is to review each ticket in the attached CSV and make a determination of whether this ticket represents a fix documentation can and should make. Examples include: missing or unclear instruction, tickets where multiple docs links were supplied to answer a single question, or tickets where docs were not supplied. Not billing tickets and not bug reports. 
```

Call out specifcally what you want the LLM to find, and then give specific examples. Use "not" and be clear and strict about what not to include. Include quoted examples of the kind of data you want to find, as in directly quoted from your customers. 

Then, give the LLM clear instruction when a match occurs:

```text
For each ticket that qualifies as an issue docs can fix, produce an outline that contains the following:

1. An intro paragraph. Briefly explain the feature and the intended outcome. 
2. Instruction on how to access the feature. Refer to the closest known location and rely on the reviewer to validate. 
3. Instructions on how to edit or delete the feature, again relying on the reviewer to verify your closest known location. 
4. Any open questions uncovered during your research that a Tech writer should follow up on with a SME. 

List unordered bullet points to state all known supporting evidence. Flag any evidence you find that you cannot verify. 

[Insert CSV content or Ticket Transcript Here]
```
Personally, I started with an outline until my style guide was consistently achieving output I considered 80% passable. At that point, I'm doing UI and feature nuance checks. This output refinement takes time, and the level of prompting required is worth coverage in its own post. 

The best output for starters acts as a framework that makes writing effortless. When you're putting fingers to keyboard, it's to refine and polish instruction and add your own linguistic and syntactic choices to the text. 

> Consider the level of visibility your LLM currently has on your knowledge base. It may not see what you think it can without some configuration on your side.


## Mining Internal Slack Messages

Your company probably has some kind of internal support channel. If it doesn't, you can start one and be a hero today. 

If you have LLMs connected to Slack, I would suggest tagging specific people and channels as part of a daily review skill you build. The objective: what are these people or channels saying that docs needs to worry about?

My prompting usually includes something like:

```text
In #channel, users @joe, @sally, and @rick usually have questions that involve engineering. Flag any non-billing questions from those users, as well as any other questions from other users that did not have a knowledge base link in the response
```

BTW, this tip also works for sales channels. Your sales people usually type out a debrief, and sometimes link to their calls and demos. Your LLM can pick these up and highlight areas for review on your side. 

Most of the time, these channels end up teaching folks how to read the docs. But once you get past that cynicism, you'll find the docs don't cover every technical use case. 

Staying active in these channels does two things for your career:

1. Visibility. More of the company sees you responding more and interacting more. You begin to brand yourself as the resident SME and doc master. 
2. Docs nuance. There's a lot of technical nuance you're probably missing even on docs you're most proud of. When engineers speak, you should listen. 

![My dear apprentice]({{ '/assets/images/dear-apprentice.jpg' | relative_url }})


## Coffee Chats

One of the most impactful documents I've written this year came from a coffee chat I had with a CSM lead. 

When she started telling me about her job, I asked her what annoyed her about it and she was surprisingly open with me. There was a lot of manual information gathering spread across many channels, and maintaining a mental model for that was incredibly taxing. To the point where she was going to write her own runbook to deal with it and that was my cue!

This kind of interaction only happens when you drop your docs hat and exercise some human empathy. What bothers your colleagues about their work, and how motivated are you to help fix those issues? Very often, there's a process document or external fix you can make that makes someone's life much easier. 

And this leads into my final point.


## The hidden feedback

If you've made it this far, you're realizing there's a hidden layer of feedback you will NEVER see. Your people's own runbooks.

To crack this one, you need to talk to your team. Spending a few extra minutes to be that shoulder or that venting outlet will very often lead to an idea for a document. 

My pet peeve is other writers listening to me say something and then telling me I should write a story about that. Probably true. Still don't like to hear it. But in this case, I give you license to be that writer. 

There's a story there. You just need to listen critically and empathetically to find it. 


## My Unofficial Results

I'd be breaking probably a thousand NDA's sharing actual numbers. So we'll keep this vague while conveying real docs impact. 

After three months of this practice:

| My action | Change | Takeaways |
|---|---|---|
| **1. Pulling support tickets and looking for gaps** | • 30 % drop in docs gaps.<br>• Targeted repeat queries → less support load. | Proactively mining tickets reveals the most‑asked‑about gaps, allowing you to fix documentation quickly and cut the number of tickets that bounce back to support. |
| **2. Using an LLM to analyse ticket sentiment** | • Article CSAT surged, with some pieces reaching > 80 % satisfaction.<br>• LLM highlighted specific customer concerns that could be acted on. | LLMs turn raw ticket data into actionable insight, surfacing pain points you might miss and driving measurable improvements in user satisfaction. |
| **3. Examining internal channels (Slack, sales debriefs, etc.)** | • 80 % of top‑traffic docs refreshed based on direct sales feedback.<br>• No‑results logs cut by 25 % via better content tagging, eliminating “I can’t find X” queries. | Listening to internal conversations uncovers hidden documentation needs; systematic tagging and timely updates dramatically improve findability and reduce “dead‑end” searches. |
| **4. Taking coffee‑chat and internal feedback seriously** | • Docs response time shrank from days to hours.<br>• Team (TW) moved to a proactive stance, directly influencing support response rates. | Personal, informal feedback loops surface high‑impact opportunities, enabling rapid, targeted patches that keep docs current and boost overall support efficiency. |

> If a support ticket costs your company $20-40 to finish, and you reduce support's load by 30%, you're easily saving your company upwards of several thousand month over month. 
>
> You should be openly bragging about that to everyone who will listen. 


## Summing it all up

From State of Docs, what is clear:

* 74% of respondents rate their docs as at least somewhat effective for self-service troubleshooting. Troubleshooting is measured as:
    * Reduction in ticket volumes
    * Monitoring customer self-service success
    * Response time improvements on the CS side
* Top docs metrics tracked include: total coverage (as a % of features), freshness and accuracy, and docs quality scores. All of these rank higher than time to publish. 
* Half of the respondents say docs are important or essential for closing deals. You will very likely find your sales folks mentioning this if they're posting debriefs. 

Feedback lands all over your organization, and as size increases you stop becoming someone's first contact when things go wrong. A structured approach to feedback collection, some empathy for your colleagues, and a renewed interest in how your customers use your product will lead you to a steady flow of docs tasks making targeted improvements. 

Bounce rate no longer matters the way CSAT does. 

![Bounce rate and CSAT comparison]({{ '/assets/images/b2k7d2.jpg' | relative_url }})


## What’s your hidden feedback channel?  