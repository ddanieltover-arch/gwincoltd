# Prisma core shapes

Adapt field names to the client domain; keep these **entities and relationships** when the matching module is on.

## Enums

```prisma
enum AdminRole {
  SUPER_ADMIN
  ADMIN
  EDITOR
  SALES_MANAGER
  READ_ONLY
}

enum PublishStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum QuoteStatus {
  NEW
  IN_PROGRESS
  AWAITING_INFO
  QUOTED
  CLOSED
  SPAM
  ARCHIVED
}

enum InquiryStatus {
  NEW
  IN_PROGRESS
  CLOSED
  SPAM
  ARCHIVED
}

enum InquirySource {
  INQUIRY
  CONTACT
  AI_ESCALATION
}

enum ApplicationStatus {
  NEW
  UNDER_REVIEW
  APPROVED
  REJECTED
  SPAM
}

enum Incoterm {
  FOB
  CIF
  EXW
  CNF
  OTHER
}
```

## Models (fields are the reusable minimum)

### User

`id`, `email` @unique, `passwordHash`, `name`, `role` (AdminRole), timestamps

### Category → Product

- Category: `slug` @unique, `name`, `sortOrder`
- Product: `categoryId`, `slug` @unique, `name`, `shortDescription`, `description`, `originCountry?`, `status` (PublishStatus), `publishedAt?`
- ProductSpecification: `productId`, `label`, `value`, `unit?`, `sortOrder`
- ProductPackaging: `productId`, `name`, `sizeLabel?`, `notes?`, `sortOrder`
- ProductImage: `productId`, `url`, `alt`, `publicId?`, `sortOrder`, `isPrimary`

### QuoteRequest

`referenceCode`, company/contact/email/phone/country, `productId?`, `productLabel?`, `quantityText`, `destination`, `incoterm?`, `targetDate?`, `message?`, `status`, `version` (Int, default 0) for optimistic concurrency, timestamps

### Inquiry

`companyName?`, `contactName`, `email`, `phone?`, `country?`, `message`, `source`, `sourcePath?`, `status`, timestamps

### DealerApplication / DistributorApplication

`companyName`, `contactName`, `email`, `phone?`, `country`, `marketsServed?`, `message?`, `status`, timestamps

(Or single `PartnerApplication` with `type` enum if preferred.)

### Certification

`name`, `issuer?`, `summary?`, `documentUrl?`, `sortOrder`, `status`, `publishedAt?`

### SitePage

`slug` @unique, `title`, `body`, `status`

## Service naming helpers

| Need | Function style |
|---|---|
| Dashboard counts | `countQuotesByStatuses`, `countNewInquiries`, `countNewPartnerApplications` |
| Lists | `listQuotes`, `listInquiries`, … |
| Detail | `getQuoteById`, … |
| Public intake | `createQuoteRequest`, `createInquiry`, … (used by marketing forms) |

## Datasource

Local SQLite + production Postgres is fine (match host project). Do not invent a second ORM.
