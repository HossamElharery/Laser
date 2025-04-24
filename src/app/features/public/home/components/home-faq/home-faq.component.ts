import { Component } from '@angular/core';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-home-faq',
  imports: [],
  templateUrl: './home-faq.component.html',
  styleUrl: './home-faq.component.scss'
})
export class HomeFaqComponent {
  faqItems: FaqItem[] = [
    {
      id: 1,
      question: 'Lorem ipsum dolor sit amet consectetur. Posuere sollicitudin volutpat dolor ipsum ?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Sit sit eu mi nibh et morbi ac. Ante non eget erat nulla. Adipiscing elementum tempus tellus non. Nulla in sed sit eget. Lorem ipsum dolor sit amet consectetur. Sit sit eu mi nibh et morbi ac. Ante non eget erat nulla. Adipiscing elementum tempus tellus non. Nulla in sed sit eget.Lorem ipsum dolor sit amet consectetur. Sit sit eu mi nibh et morbi ac. Ante non eget erat nulla. Adipiscing elementum tempus tellus non. Nulla in sed sit eget.',
      isOpen: true
    },
    {
      id: 2,
      question: 'Lorem ipsum dolor sit amet consectetur. Posuere sollicitudin volutpat dolor ipsum ?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Sit sit eu mi nibh et morbi ac. Ante non eget erat nulla. Adipiscing elementum tempus tellus non. Nulla in sed sit eget.',
      isOpen: false
    },
    {
      id: 3,
      question: 'Lorem ipsum dolor sit amet consectetur. Posuere sollicitudin volutpat dolor ipsum ?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Sit sit eu mi nibh et morbi ac. Ante non eget erat nulla. Adipiscing elementum tempus tellus non. Nulla in sed sit eget.',
      isOpen: false
    },
    {
      id: 4,
      question: 'Lorem ipsum dolor sit amet consectetur. Posuere sollicitudin volutpat dolor ipsum ?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Sit sit eu mi nibh et morbi ac. Ante non eget erat nulla. Adipiscing elementum tempus tellus non. Nulla in sed sit eget.',
      isOpen: false
    },
    {
      id: 5,
      question: 'Lorem ipsum dolor sit amet consectetur. Posuere sollicitudin volutpat dolor ipsum ?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Sit sit eu mi nibh et morbi ac. Ante non eget erat nulla. Adipiscing elementum tempus tellus non. Nulla in sed sit eget.',
      isOpen: false
    },
    {
      id: 6,
      question: 'Lorem ipsum dolor sit amet consectetur. Posuere sollicitudin volutpat dolor ipsum ?',
      answer: 'Lorem ipsum dolor sit amet consectetur. Sit sit eu mi nibh et morbi ac. Ante non eget erat nulla. Adipiscing elementum tempus tellus non. Nulla in sed sit eget.',
      isOpen: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Any initialization logic
  }

  // Optional: If you want to handle toggling programmatically instead of relying on Bootstrap's built-in behavior
  toggleFaq(index: number): void {
    // Close all other items
    this.faqItems.forEach((item, i) => {
      if (i !== index) {
        item.isOpen = false;
      }
    });

    // Toggle the clicked item
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}
