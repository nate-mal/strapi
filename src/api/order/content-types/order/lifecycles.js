const shipping_cost = 2999;

module.exports = {
  async beforeUpdate(event) {
    const { data, where } = event.params;
    console.log("event", event);

    const existing = await strapi.query("api::order.order").findOne({
      where,
    });
    console.log(existing);
    if (
      data &&
      existing &&
      data.status === "confirmed" &&
      existing.status === "processing"
    ) {
      let total = 0;
      const shipping = existing.payment_method === "online" ? 0 : shipping_cost;
      const products = existing.products.map((item) => {
        const price = item.price_data.unit_amount;
        const art_id = item.price_data.product_data.art_id;
        const location = item.price_data.product_data.location;
        const slug = item.price_data.product_data.slug;
        total += price * item.quantity;
        return {
          name: item.price_data.product_data.name,
          desc: item.price_data.product_data.description,
          price: price,
          quantity: item.quantity,
          art_id: art_id,
          slug,
          location,
        };
      });
      // trimite email confirmare la client
      const sendToClient = existing.email;
      strapi.log.debug(`Trying to send an email to ${existing.name}`);

      try {
        const emailOptions = {
          to: sendToClient,
          subject: `Hello ${existing.name}! Am primit comanda ta.`,
          html: `<!DOCTYPE html>

          <html
            lang="en"
            xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:v="urn:schemas-microsoft-com:vml"
          >
            <head>
              <title></title>
              <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
              <meta content="width=device-width, initial-scale=1.0" name="viewport" />
              <!--[if mso
                ]><xml
                  ><o:OfficeDocumentSettings
                    ><o:PixelsPerInch>96</o:PixelsPerInch
                    ><o:AllowPNG /></o:OfficeDocumentSettings></xml
              ><![endif]-->
              <style>
                * {
                  box-sizing: border-box;
                }
          
                body {
                  margin: 0;
                  padding: 0;
                }
          
                a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: inherit !important;
                }
          
                #MessageViewBody a {
                  color: inherit;
                  text-decoration: none;
                }
          
                p {
                  line-height: inherit;
                }
          
                .desktop_hide,
                .desktop_hide table {
                  mso-hide: all;
                  display: none;
                  max-height: 0px;
                  overflow: hidden;
                }
          
                .image_block img + div {
                  display: none;
                }
          
                @media (max-width: 700px) {
                  .desktop_hide table.icons-inner,
                  .social_block.desktop_hide .social-table {
                    display: inline-block !important;
                  }
          
                  .icons-inner {
                    text-align: center;
                  }
          
                  .icons-inner td {
                    margin: 0 auto;
                  }
          
                  .fullMobileWidth,
                  .row-content {
                    width: 100% !important;
                  }
          
                  .mobile_hide {
                    display: none;
                  }
          
                  .stack .column {
                    width: 100%;
                    display: block;
                  }
          
                  .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                  }
          
                  .desktop_hide,
                  .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                  }
                }
              </style>
            </head>
            <body
              style="
                background-color: #e1f0f1;
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: none;
                text-size-adjust: none;
              "
            >
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="nl-container"
                role="presentation"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background-color: #e1f0f1;
                "
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-1"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #e8e2dd;
                        "
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="100%"
                                    >
                                      <div
                                        class="spacer_block block-1"
                                        style="
                                          height: 35px;
                                          line-height: 35px;
                                          font-size: 1px;
                                        "
                                      >
                                         
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-2"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #e8e2dd;
                          background-image: url('https://i.postimg.cc/g0C0bvDy/bg-hero.png');
                          background-position: center top;
                          background-repeat: no-repeat;
                        "
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-radius: 0;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="100%"
                                    >
                                      <div
                                        class="spacer_block block-1"
                                        style="
                                          height: 35px;
                                          line-height: 35px;
                                          font-size: 1px;
                                        "
                                      >
                                         
                                      </div>
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="icons_block block-2"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="pad"
                                            style="
                                              vertical-align: middle;
                                              color: #000000;
                                              font-family: inherit;
                                              font-size: 14px;
                                              text-align: center;
                                            "
                                          >
                                            <table
                                              align="center"
                                              cellpadding="0"
                                              cellspacing="0"
                                              class="alignment"
                                              role="presentation"
                                              style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                              "
                                            >
                                              <tr>
                                                <td
                                                  style="
                                                    vertical-align: middle;
                                                    text-align: center;
                                                    padding-top: 5px;
                                                    padding-bottom: 15px;
                                                    padding-left: 5px;
                                                    padding-right: 5px;
                                                  "
                                                >
                                                  <img
                                                    align="center"
                                                    class="icon"
                                                    height="64"
                                                    src="https://i.postimg.cc/NG6c7YWP/logo-art.png"
                                                    style="
                                                      display: block;
                                                      height: auto;
                                                      margin: 0 auto;
                                                      border: 0;
                                                    "
                                                    width="64"
                                                  />
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="heading_block block-3"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="pad"
                                            style="
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              text-align: center;
                                              width: 100%;
                                            "
                                          >
                                            <h1
                                              style="
                                                margin: 0;
                                                color: #010101;
                                                direction: ltr;
                                                font-family: Arial, Helvetica Neue,
                                                  Helvetica, sans-serif;
                                                font-size: 40px;
                                                font-weight: normal;
                                                letter-spacing: normal;
                                                line-height: 120%;
                                                text-align: center;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                              "
                                            >
                                              <strong>Mulțumim!</strong>
                                            </h1>
                                          </td>
                                        </tr>
                                      </table>
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="heading_block block-4"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="pad"
                                            style="
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              text-align: center;
                                              width: 100%;
                                            "
                                          >
                                            <h1
                                              style="
                                                margin: 0;
                                                color: #010101;
                                                direction: ltr;
                                                font-family: Arial, Helvetica Neue,
                                                  Helvetica, sans-serif;
                                                font-size: 39px;
                                                font-weight: normal;
                                                letter-spacing: normal;
                                                line-height: 120%;
                                                text-align: center;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                              "
                                            >
                                              <strong>Comanda ta</strong>
                                            </h1>
                                          </td>
                                        </tr>
                                      </table>
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="heading_block block-5"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="pad"
                                            style="
                                              padding-bottom: 15px;
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              text-align: center;
                                              width: 100%;
                                            "
                                          >
                                            <h1
                                              style="
                                                margin: 0;
                                                color: #010101;
                                                direction: ltr;
                                                font-family: Arial, Helvetica Neue,
                                                  Helvetica, sans-serif;
                                                font-size: 40px;
                                                font-weight: normal;
                                                letter-spacing: normal;
                                                line-height: 120%;
                                                text-align: center;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                              "
                                            >
                                              <strong>a fost plasată cu succes.</strong>
                                            </h1>
                                          </td>
                                        </tr>
                                      </table>
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="image_block block-6"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="pad"
                                            style="
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              padding-top: 20px;
                                              width: 100%;
                                            "
                                          >
                                            <div
                                              align="center"
                                              class="alignment"
                                              style="line-height: 10px"
                                            >
                                              <img
                                                alt="Skin Care"
                                                class="fullMobileWidth"
                                                src="https://i.postimg.cc/gjdknm1n/confrimed-stamp-middle-1.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                  width: 272px;
                                                  max-width: 100%;
                                                "
                                                title="Skin Care"
                                                width="272"
                                              />
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-3"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #e8e2dd;
                        "
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="100%"
                                    >
                                      <div
                                        class="spacer_block block-1"
                                        style="
                                          height: 35px;
                                          line-height: 35px;
                                          font-size: 1px;
                                        "
                                      >
                                         
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table class="button_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0" cellpadding="10" border="0">
                      <tbody><tr>
                        <td class="pad">
                          <div class="alignment" align="center"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${`${process.env.CLIENT_URL}/order?checkout_session=${existing.checkout_session}`}" style="height:44px;width:237px;v-text-anchor:middle;" arcsize="10%" strokeweight="0.75pt" strokecolor="#010101" fill="false"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#010101; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="${`${process.env.CLIENT_URL}/order?checkout_session=${existing.checkout_session}`}" target="_blank" style="text-decoration:none;display:inline-block;color:#010101;background-color:transparent;border-radius:4px;width:auto;border-top:1px solid #010101;font-weight:undefined;border-right:1px solid #010101;border-bottom:1px solid #010101;border-left:1px solid #010101;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:40px;padding-right:40px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="word-break: break-word; line-height: 32px;">Vezi statusul comenzi</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-4"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="100%"
                                    >
                                      <div
                                        class="spacer_block block-1"
                                        style="
                                          height: 35px;
                                          line-height: 35px;
                                          font-size: 1px;
                                        "
                                      >
                                         
                                      </div>
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="heading_block block-2"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="pad"
                                            style="
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              text-align: center;
                                              width: 100%;
                                            "
                                          >
                                            <h1
                                              style="
                                                margin: 0;
                                                color: #010101;
                                                direction: ltr;
                                                font-family: Arial, Helvetica Neue,
                                                  Helvetica, sans-serif;
                                                font-size: 34px;
                                                font-weight: normal;
                                                letter-spacing: normal;
                                                line-height: 120%;
                                                text-align: center;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                              "
                                            >
                                              <strong>Sumar comandă</strong>
                                            </h1>
                                          </td>
                                        </tr>
                                      </table>
                                      <div
                                        class="spacer_block block-3"
                                        style="
                                          height: 25px;
                                          line-height: 25px;
                                          font-size: 1px;
                                        "
                                      >
                                         
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-5"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="41.666666666666664%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #cc835c;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: left;
                                                    mso-line-height-alt: 24px;
                                                  "
                                                >
                                                  <span style="font-size: 16px"
                                                    >Nr. #${existing.id}<br
                                                  /></span>
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                    <td
                                      class="column column-2"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="58.333333333333336%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #cc835c;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: right;
                                                    mso-line-height-alt: 24px;
                                                  "
                                                >
                                                  <span style="font-size: 16px"
                                                    >${new Date().toLocaleDateString(
                                                      "ro-RO"
                                                    )}</span
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!-- first ________________________________________________________________________________-->
                     <div >
                         ${products.map((product) => {
                           return `<div>
                               <table
                                 align="center"
                                 border="0"
                                 cellpadding="0"
                                 cellspacing="0"
                                 class="row row-6"
                                 role="presentation"
                                 style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-position: center top;
                        "
                                 width="100%"
                               >
                                 <tbody>
                                   <tr>
                                     <td>
                                       <table
                                         align="center"
                                         border="0"
                                         cellpadding="0"
                                         cellspacing="0"
                                         class="row-content stack"
                                         role="presentation"
                                         style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  background-color: #cfdddf;
                                  color: #000000;
                                  width: 680px;
                                "
                                         width="680"
                                       >
                                         <tbody>
                                           <tr>
                                             <td
                                               class="column column-1"
                                               style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        background-color: #b2c1c3;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                               width="25%"
                                             >
                                               <div
                                                 class="spacer_block block-1"
                                                 style="
                                          height: 20px;
                                          line-height: 20px;
                                          font-size: 1px;
                                        "
                                               >
                                                  
                                               </div>
                                               <table
                                                 border="0"
                                                 cellpadding="0"
                                                 cellspacing="0"
                                                 class="image_block block-2"
                                                 role="presentation"
                                                 style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                                 width="100%"
                                               >
                                                 <tr>
                                                   <td
                                                     class="pad"
                                                     style="
                                              width: 100%;
                                              padding-right: 0px;
                                              padding-left: 0px;
                                            "
                                                   >
                                                     <div
                                                       align="center"
                                                       class="alignment"
                                                       style="line-height: 10px"
                                                     > <a
                                                     href="${
                                                       product.slug
                                                         ? `${process.env.CLIENT_URL}/products/${product.slug}`
                                                         : `${process.env.CLIENT_URL}`
                                                     }"
                                                     rel="noopener"
                                                     style="text-decoration: none; color: #ffffff"
                                                     target="_blank"
                                                     >
                                                       <img
                                                         alt="${product.name}"
                                                         class="fullMobileWidth"
                                                         source="${`${process.env.CLIENT_URL}/images/${product.art_id}/image-0.jpg}`}"
                                                         src="https://i.postimg.cc/tCBC40k4/spa-product.png"
                                                         style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                  width: 136px;
                                                  max-width: 100%;
                                                "
                                                         title="${product.name}"
                                                         width="136"
                                                       /></a>
                                                     </div>
                                                   </td>
                                                 </tr>
                                               </table>
                                               <div
                                                 class="spacer_block block-3"
                                                 style="
                                          height: 20px;
                                          line-height: 20px;
                                          font-size: 1px;
                                        "
                                               >
                                                  
                                               </div>
                                             </td>
                                             <td
                                               class="column column-2"
                                               style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                               width="41.666666666666664%"
                                             >
                                               <div
                                                 class="spacer_block block-1"
                                                 style="
                                          height: 30px;
                                          line-height: 30px;
                                          font-size: 1px;
                                        "
                                               >
                                                  
                                               </div>
                                               <table
                                                 border="0"
                                                 cellpadding="0"
                                                 cellspacing="0"
                                                 class="heading_block block-2"
                                                 role="presentation"
                                                 style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                                 width="100%"
                                               >
                                                 <tr>
                                                   <td
                                                     class="pad"
                                                     style="
                                              padding-bottom: 10px;
                                              padding-left: 15px;
                                              padding-right: 10px;
                                              text-align: center;
                                              width: 100%;
                                            "
                                                   >
                                                     <h1
                                                       style="
                                                margin: 0;
                                                color: #010101;
                                                direction: ltr;
                                                font-family: Arial, Helvetica Neue,
                                                  Helvetica, sans-serif;
                                                font-size: 24px;
                                                font-weight: normal;
                                                letter-spacing: normal;
                                                line-height: 120%;
                                                text-align: left;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                              "
                                                     ><a
                                                     href="${
                                                       product.slug
                                                         ? `${process.env.CLIENT_URL}/products/${product.slug}`
                                                         : `${process.env.CLIENT_URL}`
                                                     }"
                                                     rel="noopener"
                                                     style="text-decoration: none; color: #ffffff"
                                                     target="_blank"
                                                     >
                                                       <strong>
                                                         ${product.name}
                                                       </strong></a>
                                                     </h1>
                                                   </td>
                                                 </tr>
                                               </table>
                                               <table
                                                 border="0"
                                                 cellpadding="0"
                                                 cellspacing="0"
                                                 class="text_block block-3"
                                                 role="presentation"
                                                 style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                                 width="100%"
                                               >
                                                 <tr>
                                                   <td
                                                     class="pad"
                                                     style="
                                              padding-bottom: 10px;
                                              padding-left: 15px;
                                              padding-right: 10px;
                                              padding-top: 10px;
                                            "
                                                   >
                                                     <div style="font-family: sans-serif">
                                                       <div
                                                         class=""
                                                         style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #393d47;
                                                  line-height: 1.5;
                                                "
                                                       >
                                                         <p
                                                           style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: left;
                                                    mso-line-height-alt: 21px;
                                                  "
                                                         >
                                                          ${
                                                            product.desc
                                                              ? `${product.desc.slice(
                                                                  0,
                                                                  100
                                                                )}...`
                                                              : ""
                                                          }
                                                         </p>
                                                       </div>
                                                     </div>
                                                   </td>
                                                 </tr>
                                               </table>
                                               <table class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														                         <tbody><tr>
															                         <td class="pad">
																                          <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
																	                       <p style="margin: 0;"><strong>cantitate: ${
                                                           product.quantity
                                                         }</strong></p>
																                            </div>
															                                 </td>
														                                       </tr>
													                                      </tbody></table>
                                                                <table class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
                                                                <tbody><tr>
                                                                  <td class="pad">
                                                                     <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                    <p style="margin: 0;"><strong>preț pe bucată: ${(
                                                                      product.price /
                                                                      100
                                                                    ).toFixed(
                                                                      2
                                                                    )} </strong></p>
                                                                       </div>
                                                                          </td>
                                                                              </tr>
                                                                           </tbody></table>
                                             </td>
                                             <td
                                               class="column column-3"
                                               style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                               width="16.666666666666668%"
                                             >
                                               <div
                                                 class="spacer_block block-1"
                                                 style="
                                          height: 0px;
                                          line-height: 0px;
                                          font-size: 1px;
                                        "
                                               >
                                                  
                                               </div>
                                             </td>
                                             <td
                                               class="column column-4"
                                               style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                               width="16.666666666666668%"
                                             >
                                               <div
                                                 class="spacer_block block-1"
                                                 style="
                                          height: 35px;
                                          line-height: 35px;
                                          font-size: 1px;
                                        "
                                               >
                                                  
                                               </div>
                                               <table
                                                 border="0"
                                                 cellpadding="0"
                                                 cellspacing="0"
                                                 class="heading_block block-2"
                                                 role="presentation"
                                                 style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                                 width="100%"
                                               >
                                                 <tr>
                                                   <td
                                                     class="pad"
                                                     style="
                                              padding-bottom: 15px;
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              text-align: center;
                                              width: 100%;
                                            "
                                                   >
                                                     <h1
                                                       style="
                                                margin: 0;
                                                color: #010101;
                                                direction: ltr;
                                                font-family: Arial, Helvetica Neue,
                                                  Helvetica, sans-serif;
                                                font-size: 18px;
                                                font-weight: normal;
                                                letter-spacing: normal;
                                                line-height: 120%;
                                                text-align: left;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                              "
                                                     >
                                                       <strong>
                                                         ${(
                                                           (product.price *
                                                             product.quantity) /
                                                           100
                                                         ).toFixed(2)} lei
                                                       </strong>
                                                     </h1>
                                                   </td>
                                                 </tr>
                                               </table>
                                             </td>
                                           </tr>
                                         </tbody>
                                       </table>
                                     </td>
                                   </tr>
                                 </tbody>
                               </table>
                               <table
                                 align="center"
                                 border="0"
                                 cellpadding="0"
                                 cellspacing="0"
                                 class="row row-7"
                                 role="presentation"
                                 style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #e1f0f1;
                        "
                                 width="100%"
                               >
                                 <tbody>
                                   <tr>
                                     <td>
                                       <table
                                         align="center"
                                         border="0"
                                         cellpadding="0"
                                         cellspacing="0"
                                         class="row-content stack"
                                         role="presentation"
                                         style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                         width="680"
                                       >
                                         <tbody>
                                           <tr>
                                             <td
                                               class="column column-1"
                                               style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                               width="100%"
                                             >
                                               <div
                                                 class="spacer_block block-1"
                                                 style="
                                          height: 25px;
                                          line-height: 25px;
                                          font-size: 1px;
                                        "
                                               >
                                                  
                                               </div>
                                             </td>
                                           </tr>
                                         </tbody>
                                       </table>
                                     </td>
                                   </tr>
                                 </tbody>
                               </table>
                             </div>`;
                         })}
                       </div>
                      <!-- final ------------------------------------------- -->
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-12"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="41.666666666666664%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #cc835c;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: left;
                                                    mso-line-height-alt: 21px;
                                                  "
                                                >
                                                  <strong
                                                    ><span style="font-size: 16px"
                                                      >Sumar comanda<br /></span
                                                  ></strong>
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                    <td
                                      class="column column-2"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="58.333333333333336%"
                                    >
                                      <div
                                        class="spacer_block block-1"
                                        style="
                                          height: 0px;
                                          line-height: 0px;
                                          font-size: 1px;
                                        "
                                      >
                                         
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-13"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="41.666666666666664%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #010101;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: left;
                                                    mso-line-height-alt: 24px;
                                                  "
                                                >
                                                  <span style="font-size: 16px"
                                                    >Sub total</span
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                    <td
                                      class="column column-2"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="58.333333333333336%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #010101;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: right;
                                                    mso-line-height-alt: 24px;
                                                  "
                                                >
                                                  <span style="font-size: 16px"
                                                    >${(total / 100).toFixed(
                                                      2
                                                    )} lei<br
                                                  /></span>
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-14"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="100%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="divider_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div align="center" class="alignment">
                                              <table
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="
                                                  mso-table-lspace: 0pt;
                                                  mso-table-rspace: 0pt;
                                                "
                                                width="100%"
                                              >
                                                <tr>
                                                  <td
                                                    class="divider_inner"
                                                    style="
                                                      font-size: 1px;
                                                      line-height: 1px;
                                                      border-top: 1px solid #bbbbbb;
                                                    "
                                                  >
                                                    <span> </span>
                                                  </td>
                                                </tr>
                                              </table>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-15"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="41.666666666666664%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #010101;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    mso-line-height-alt: 21px;
                                                  "
                                                >
                                                  Cost livrare și procesare:
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-2"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #010101;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: left;
                                                    mso-line-height-alt: 21px;
                                                  "
                                                >
                                                  <strong
                                                    ><span style="font-size: 16px"
                                                      >Total</span
                                                    ></strong
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                    <td
                                      class="column column-2"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="58.333333333333336%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #010101;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: right;
                                                    mso-line-height-alt: 24px;
                                                  "
                                                >
                                                  <span style="font-size: 16px"
                                                    >${(shipping / 100).toFixed(
                                                      2
                                                    )}
                                                    lei</span
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-2"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #010101;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: right;
                                                    mso-line-height-alt: 24px;
                                                  "
                                                >
                                                  <span style="font-size: 16px"
                                                    ><span style="font-size: 20px"
                                                      ><strong
                                                        >${(
                                                          (total + shipping) /
                                                          100
                                                        ).toFixed(
                                                          2
                                                        )} lei</strong
                                                      ></span
                                                    ><br
                                                  /></span>
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table class="row row-15" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
						<tbody>
							<tr>
								<td>
									<table class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680" cellspacing="0" cellpadding="0" border="0" align="center">
										<tbody>
											<tr>
												<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="41.666666666666664%">
													<table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														<tbody><tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #cc835c; line-height: 1.5;">
																		<p style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 21px;"><strong><span style="font-size:16px;">Detalii livrare:<br></span></strong></p>
																	</div>
																</div>
															</td>
														</tr>
													</tbody></table>
												</td>
												<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="58.333333333333336%">
													<div class="spacer_block block-1" style="height:0px;line-height:0px;font-size:1px;"> </div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
          <table class="row row-16" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
						<tbody>
							<tr>
								<td>
									<table class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680" cellspacing="0" cellpadding="0" border="0" align="center">
										<tbody>
											<tr>
												<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="41.666666666666664%">
													<table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														<tbody><tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
																		<p style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 24px;"><span style="font-size:16px;">Nume:</span></p>
																	</div>
																</div>
															</td>
														</tr>
													</tbody></table>
												</td>
												<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="58.333333333333336%">
													<table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														<tbody><tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
																		<p style="margin: 0; font-size: 14px; text-align: right; mso-line-height-alt: 24px;"><span style="font-size:16px;">${
                                      existing.name
                                    }<br></span></p>
																	</div>
																</div>
															</td>
														</tr>
													</tbody>
                          </table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
          <table class="row row-17" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
						<tbody>
							<tr>
								<td>
									<table class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680" cellspacing="0" cellpadding="0" border="0" align="center">
										<tbody>
											<tr>
												<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="41.666666666666664%">
													<table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														<tbody><tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
																		<p style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 24px;"><span style="font-size:16px;">Telefon:</span></p>
																	</div>
																</div>
															</td>
														</tr>
													</tbody></table>
												</td>
												<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="58.333333333333336%">
													<table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														<tbody><tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
																		<p style="margin: 0; font-size: 14px; text-align: right; mso-line-height-alt: 24px;"><span style="font-size:16px;">${
                                      existing.phone
                                    }<br></span></p>
																	</div>
																</div>
															</td>
														</tr>
													</tbody></table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
          <table class="row row-18" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
						<tbody>
							<tr>
								<td>
									<table class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680" cellspacing="0" cellpadding="0" border="0" align="center">
										<tbody>
											<tr>
												<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="41.666666666666664%">
													<table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														<tbody><tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
																		<p style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 24px;"><span style="font-size:16px;">Adresă:</span></p>
																	</div>
																</div>
															</td>
														</tr>
													</tbody></table>
												</td>
												<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="58.333333333333336%">
													<table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														<tbody><tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
																		<p style="margin: 0; font-size: 14px; text-align: right; mso-line-height-alt: 24px;"><span style="font-size:16px;">${
                                      existing.address
                                    }<br></span></p>
																	</div>
																</div>
															</td>
														</tr>
													</tbody></table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
          <table class="row row-18" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
<tbody>
  <tr>
    <td>
      <table class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680" cellspacing="0" cellpadding="0" border="0" align="center">
        <tbody>
          <tr>
            <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="41.666666666666664%">
              <table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
                <tbody><tr>
                  <td class="pad">
                    <div style="font-family: sans-serif">
                      <div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
                        <p style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 24px;"><span style="font-size:16px;">Plată:</span></p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody></table>
            </td>
            <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="58.333333333333336%">
              <table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
                <tbody><tr>
                  <td class="pad">
                    <div style="font-family: sans-serif">
                      <div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
                        <p style="margin: 0; font-size: 14px; text-align: right; mso-line-height-alt: 24px;"><span style="font-size:16px;">${
                          existing.payment_method === "online"
                            ? `Online Stripe Payments`
                            : `Ramburs`
                        }<br></span></p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
</table>
         
         
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <!-- End -->
              <p style="padding:10px;"> ${new Date()}</p>
            </body>
            <footer><table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row row-16"
            role="presentation"
            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row-content stack"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      color: #000000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          "
                          width="100%"
                        >
                          <div
                            class="spacer_block block-1"
                            style="height: 25px; line-height: 25px; font-size: 1px"
                          >
                             
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row row-17"
            role="presentation"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              background-color: #010101;
            "
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row-content stack"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      color: #000000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          "
                          width="100%"
                        >
                          <div
                            class="spacer_block block-1"
                            style="height: 65px; line-height: 65px; font-size: 1px"
                          >
                             
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row row-18"
            role="presentation"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              background-color: #010101;
            "
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row-content stack"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      color: #000000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          "
                          width="33.333333333333336%"
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="icons_block block-1"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  vertical-align: middle;
                                  color: #000000;
                                  font-family: inherit;
                                  font-size: 14px;
                                  padding-left: 10px;
                                  text-align: left;
                                "
                              >
                                <table
                                  align="left"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="alignment"
                                  role="presentation"
                                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                                >
                                  <tr>
                                    <td
                                      style="
                                        vertical-align: middle;
                                        text-align: center;
                                        padding-top: 5px;
                                        padding-bottom: 5px;
                                        padding-left: 5px;
                                        padding-right: 5px;
                                      "
                                    >
                                      <img
                                        align="center"
                                        alt="Company Logo"
                                        class="icon"
                                        height="64"
                                        src="https://i.postimg.cc/NG6c7YWP/logo-art.png"
                                        style="
                                          display: block;
                                          height: auto;
                                          margin: 0 auto;
                                          border: 0;
                                        "
                                        width="64"
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="text_block block-2"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              word-break: break-word;
                            "
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  padding-bottom: 20px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 10px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    class=""
                                    style="
                                      font-size: 14px;
                                      font-family: Arial, Helvetica Neue, Helvetica,
                                        sans-serif;
                                      mso-line-height-alt: 25.2px;
                                      color: #fbfbfb;
                                      line-height: 1.8;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: left;
                                        mso-line-height-alt: 25.2px;
                                      "
                                    >
                                      Reparăm, recondiționăm și revitalizăm<br />aroma
                                      cafelei tale!
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td
                          class="column column-2"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          "
                          width="33.333333333333336%"
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="heading_block block-1"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  padding-bottom: 20px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  text-align: center;
                                  width: 100%;
                                "
                              >
                                <h1
                                  style="
                                    margin: 0;
                                    color: #ffffff;
                                    direction: ltr;
                                    font-family: Arial, Helvetica Neue, Helvetica,
                                      sans-serif;
                                    font-size: 18px;
                                    font-weight: normal;
                                    letter-spacing: normal;
                                    line-height: 120%;
                                    text-align: left;
                                    margin-top: 0;
                                    margin-bottom: 0;
                                  "
                                >
                                  <strong>Link-uri Art Cafe</strong>
                                </h1>
                              </td>
                            </tr>
                          </table>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="text_block block-2"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              word-break: break-word;
                            "
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  padding-bottom: 20px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 10px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    class=""
                                    style="
                                      font-size: 14px;
                                      font-family: Arial, Helvetica Neue, Helvetica,
                                        sans-serif;
                                      mso-line-height-alt: 25.2px;
                                      color: #fbfbfb;
                                      line-height: 1.8;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: left;
                                        mso-line-height-alt: 25.2px;
                                      "
                                    >
                                      <a
                                        href="${`${process.env.CLIENT_URL}`}"
                                        rel="noopener"
                                        style="text-decoration: none; color: #ffffff"
                                        target="_blank"
                                        >Produse</a
                                      >
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="text_block block-3"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              word-break: break-word;
                            "
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  padding-bottom: 20px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 10px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    class=""
                                    style="
                                      font-size: 14px;
                                      font-family: Arial, Helvetica Neue, Helvetica,
                                        sans-serif;
                                      mso-line-height-alt: 25.2px;
                                      color: #fbfbfb;
                                      line-height: 1.8;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: left;
                                        mso-line-height-alt: 25.2px;
                                      "
                                    >
                                      <a
                                        href="${`${process.env.CLIENT_URL}/reparo`}"
                                        rel="noopener"
                                        style="text-decoration: none; color: #ffffff"
                                        target="_blank"
                                        >Reparo</a
                                      >
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="text_block block-4"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              word-break: break-word;
                            "
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  padding-bottom: 20px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 10px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    class=""
                                    style="
                                      font-size: 14px;
                                      font-family: Arial, Helvetica Neue, Helvetica,
                                        sans-serif;
                                      mso-line-height-alt: 25.2px;
                                      color: #fbfbfb;
                                      line-height: 1.8;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: left;
                                        mso-line-height-alt: 25.2px;
                                      "
                                    >
                                      <a
                                        href="${`${process.env.CLIENT_URL}/contact`}"
                                        rel="noopener"
                                        style="text-decoration: none; color: #ffffff"
                                        target="_blank"
                                        >Contact us</a
                                      >
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td
                          class="column column-3"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          "
                          width="33.333333333333336%"
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="heading_block block-1"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  padding-bottom: 20px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  text-align: center;
                                  width: 100%;
                                "
                              >
                                <h1
                                  style="
                                    margin: 0;
                                    color: #ffffff;
                                    direction: ltr;
                                    font-family: Arial, Helvetica Neue, Helvetica,
                                      sans-serif;
                                    font-size: 18px;
                                    font-weight: normal;
                                    letter-spacing: normal;
                                    line-height: 120%;
                                    text-align: left;
                                    margin-top: 0;
                                    margin-bottom: 0;
                                  "
                                >
                                  <strong>Social Media</strong>
                                </h1>
                              </td>
                            </tr>
                          </table>
                          <table
                            border="0"
                            cellpadding="10"
                            cellspacing="0"
                            class="social_block block-2"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                            width="100%"
                          >
                            <tr>
                              <td class="pad">
                                <div align="left" class="alignment">
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="social-table"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      display: inline-block;
                                    "
                                    width="144px"
                                  >
                                    <tr>
                                      <td style="padding: 0 4px 0 0">
                                        <a
                                          href="https://www.facebook.com/"
                                          target="_blank"
                                          ><img
                                            alt="Facebook"
                                            height="32"
                                            src="https://i.postimg.cc/KzgsyRRb/facebook2x.png"
                                            style="
                                              display: block;
                                              height: auto;
                                              border: 0;
                                            "
                                            title="facebook"
                                            width="32"
                                        /></a>
                                      </td>
                                      <td style="padding: 0 4px 0 0">
                                        <a href="https://www.twitter.com/" target="_blank"
                                          ><img
                                            alt="Twitter"
                                            height="32"
                                            src="https://i.postimg.cc/YqxDkcqv/twitter2x.png"
                                            style="
                                              display: block;
                                              height: auto;
                                              border: 0;
                                            "
                                            title="twitter"
                                            width="32"
                                        /></a>
                                      </td>
                                      <td style="padding: 0 4px 0 0">
                                        <a
                                          href="https://www.linkedin.com/"
                                          target="_blank"
                                          ><img
                                            alt="Linkedin"
                                            height="32"
                                            src="https://i.postimg.cc/1Xh7Rsqq/linkedin2x.png"
                                            style="
                                              display: block;
                                              height: auto;
                                              border: 0;
                                            "
                                            title="linkedin"
                                            width="32"
                                        /></a>
                                      </td>
                                      <td style="padding: 0 4px 0 0">
                                        <a
                                          href="https://www.instagram.com/"
                                          target="_blank"
                                          ><img
                                            alt="Instagram"
                                            height="32"
                                            src="https://i.postimg.cc/MH7PvN7r/instagram2x.png"
                                            style="
                                              display: block;
                                              height: auto;
                                              border: 0;
                                            "
                                            title="instagram"
                                            width="32"
                                        /></a>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row row-19"
            role="presentation"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              background-color: #010101;
            "
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row-content stack"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      color: #000000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          "
                          width="100%"
                        >
                          <div
                            class="spacer_block block-1"
                            style="height: 65px; line-height: 65px; font-size: 1px"
                          >
                             
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row row-20"
            role="presentation"
            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row-content stack"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      color: #000000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          "
                          width="100%"
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="icons_block block-1"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  vertical-align: middle;
                                  color: #9d9d9d;
                                  font-family: inherit;
                                  font-size: 15px;
                                  padding-bottom: 5px;
                                  padding-top: 5px;
                                  text-align: center;
                                "
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      class="alignment"
                                      style="vertical-align: middle; text-align: center"
                                    >
                                      <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                      <!--[if !vml]><!-->
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="icons-inner"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          display: inline-block;
                                          margin-right: -4px;
                                          padding-left: 0px;
                                          padding-right: 0px;
                                        "
                                      >
                                        <!--<![endif]-->
                                        <tr>
                                          <td
                                            style="
                                              vertical-align: middle;
                                              text-align: center;
                                              padding-top: 5px;
                                              padding-bottom: 5px;
                                              padding-left: 5px;
                                              padding-right: 6px;
                                            "
                                          >
                                            <a
                                              href="https://www.designedwithbee.com/"
                                              style="text-decoration: none"
                                              target="_blank"
                                              ><img
                                                align="center"
                                                alt="Designed with BEE"
                                                class="icon"
                                                height="32"
                                                src="https://i.postimg.cc/KYjHJ9bR/bee.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  margin: 0 auto;
                                                  border: 0;
                                                "
                                                width="34"
                                            /></a>
                                          </td>
                                          <td
                                            style="
                                              font-family: Arial, Helvetica Neue,
                                                Helvetica, sans-serif;
                                              font-size: 15px;
                                              color: #9d9d9d;
                                              vertical-align: middle;
                                              letter-spacing: undefined;
                                              text-align: center;
                                            "
                                          >
                                            <a
                                              href="https://www.designedwithbee.com/"
                                              style="
                                                color: #9d9d9d;
                                                text-decoration: none;
                                              "
                                              target="_blank"
                                              >Designed by Art dev with BEE</a
                                            >
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          </footer>
          </html>
         
          
        `,
        };
        await strapi.plugin("email").service("email").send(emailOptions);
        strapi.log.debug(`Email sent to ${sendToClient}`);
      } catch (err) {
        strapi.log.error(`Error sending email to ${sendToClient}`, err);
      }

      // trimite email confirmare comanda la admin

      const sendToAdmin = process.env.EMAIL_ADDRESS_REPLY;
      strapi.log.debug(`Trying to send an email to ${existing.name}`);

      try {
        const emailOptions = {
          to: sendToAdmin,
          subject: `Comandă nouă de la -> ${existing.name}, valoare: ${(
            total / 100
          ).toFixed(2)} lei, plată: ${existing.payment_method}`,
          html: `<!DOCTYPE html>

          <html
            lang="en"
            xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:v="urn:schemas-microsoft-com:vml"
          >
            <head>
              <title></title>
              <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
              <meta content="width=device-width, initial-scale=1.0" name="viewport" />
              <!--[if mso
                ]><xml
                  ><o:OfficeDocumentSettings
                    ><o:PixelsPerInch>96</o:PixelsPerInch
                    ><o:AllowPNG /></o:OfficeDocumentSettings></xml
              ><![endif]-->
              <style>
                * {
                  box-sizing: border-box;
                }
          
                body {
                  margin: 0;
                  padding: 0;
                }
          
                a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: inherit !important;
                }
          
                #MessageViewBody a {
                  color: inherit;
                  text-decoration: none;
                }
          
                p {
                  line-height: inherit;
                }
          
                .desktop_hide,
                .desktop_hide table {
                  mso-hide: all;
                  display: none;
                  max-height: 0px;
                  overflow: hidden;
                }
          
                .image_block img + div {
                  display: none;
                }
          
                @media (max-width: 700px) {
                  .desktop_hide table.icons-inner,
                  .social_block.desktop_hide .social-table {
                    display: inline-block !important;
                  }
          
                  .icons-inner {
                    text-align: center;
                  }
          
                  .icons-inner td {
                    margin: 0 auto;
                  }
          
                  .fullMobileWidth,
                  .row-content {
                    width: 100% !important;
                  }
          
                  .mobile_hide {
                    display: none;
                  }
          
                  .stack .column {
                    width: 100%;
                    display: block;
                  }
          
                  .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                  }
          
                  .desktop_hide,
                  .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                  }
                }
              </style>
            </head>
            <body
              style="
                background-color: #e1f0f1;
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: none;
                text-size-adjust: none;
              "
            >
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="nl-container"
                role="presentation"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  background-color: #e1f0f1;
                "
                width="100%"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-1"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #e8e2dd;
                        "
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="100%"
                                    >
                                      <div
                                        class="spacer_block block-1"
                                        style="
                                          height: 35px;
                                          line-height: 35px;
                                          font-size: 1px;
                                        "
                                      >
                                         
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-2"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #e8e2dd;
                          background-image: url('https://i.postimg.cc/g0C0bvDy/bg-hero.png');
                          background-position: center top;
                          background-repeat: no-repeat;
                        "
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-radius: 0;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="100%"
                                    >
                                      <div
                                        class="spacer_block block-1"
                                        style="
                                          height: 35px;
                                          line-height: 35px;
                                          font-size: 1px;
                                        "
                                      >
                                         
                                      </div>
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="icons_block block-2"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="pad"
                                            style="
                                              vertical-align: middle;
                                              color: #000000;
                                              font-family: inherit;
                                              font-size: 14px;
                                              text-align: center;
                                            "
                                          >
                                            <table
                                              align="center"
                                              cellpadding="0"
                                              cellspacing="0"
                                              class="alignment"
                                              role="presentation"
                                              style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                              "
                                            >
                                              <tr>
                                                <td
                                                  style="
                                                    vertical-align: middle;
                                                    text-align: center;
                                                    padding-top: 5px;
                                                    padding-bottom: 15px;
                                                    padding-left: 5px;
                                                    padding-right: 5px;
                                                  "
                                                >
                                                  <img
                                                    align="center"
                                                    class="icon"
                                                    height="64"
                                                    src="https://i.postimg.cc/NG6c7YWP/logo-art.png"
                                                    style="
                                                      display: block;
                                                      height: auto;
                                                      margin: 0 auto;
                                                      border: 0;
                                                    "
                                                    width="64"
                                                  />
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="heading_block block-3"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="pad"
                                            style="
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              text-align: center;
                                              width: 100%;
                                            "
                                          >
                                            <h1
                                              style="
                                                margin: 0;
                                                color: #010101;
                                                direction: ltr;
                                                font-family: Arial, Helvetica Neue,
                                                  Helvetica, sans-serif;
                                                font-size: 40px;
                                                font-weight: normal;
                                                letter-spacing: normal;
                                                line-height: 120%;
                                                text-align: center;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                              "
                                            >
                                              <strong>Comandă</strong>
                                            </h1>
                                          </td>
                                        </tr>
                                      </table>
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="heading_block block-4"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="pad"
                                            style="
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              text-align: center;
                                              width: 100%;
                                            "
                                          >
                                            <h1
                                              style="
                                                margin: 0;
                                                color: #010101;
                                                direction: ltr;
                                                font-family: Arial, Helvetica Neue,
                                                  Helvetica, sans-serif;
                                                font-size: 39px;
                                                font-weight: normal;
                                                letter-spacing: normal;
                                                line-height: 120%;
                                                text-align: center;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                              "
                                            >
                                              <strong>Art Cafe Store</strong>
                                            </h1>
                                          </td>
                                        </tr>
                                      </table>
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="heading_block block-5"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="pad"
                                            style="
                                              padding-bottom: 15px;
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              text-align: center;
                                              width: 100%;
                                            "
                                          >
                                            <h1
                                              style="
                                                margin: 0;
                                                color: #010101;
                                                direction: ltr;
                                                font-family: Arial, Helvetica Neue,
                                                  Helvetica, sans-serif;
                                                font-size: 40px;
                                                font-weight: normal;
                                                letter-spacing: normal;
                                                line-height: 120%;
                                                text-align: center;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                              "
                                            >
                                              <strong>Client: ${
                                                existing.name
                                              } (<a href="mailto:${sendToClient}">${sendToClient}</a>)</strong>
                                             
                                              <strong>(<a href="https://wa.me/${
                                                existing.phone
                                              }">whatsapp</a>)</strong>
                                              <strong>(<a href="tel:${
                                                existing.phone
                                              }">${existing.phone}</a>)</strong>
                                            </h1>
                                          </td>
                                        </tr>
                                      </table>
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="image_block block-6"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="pad"
                                            style="
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              padding-top: 20px;
                                              width: 100%;
                                            "
                                          >
                                            <div
                                              align="center"
                                              class="alignment"
                                              style="line-height: 10px"
                                            >
                                              <img
                                                alt="Skin Care"
                                                class="fullMobileWidth"
                                                src="https://i.postimg.cc/gjdknm1n/confrimed-stamp-middle-1.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                  width: 272px;
                                                  max-width: 100%;
                                                "
                                                title="Skin Care"
                                                width="272"
                                              />
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-3"
                        role="presentation"
                        style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #e8e2dd;
                        "
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="100%"
                                    >
                                      <div
                                        class="spacer_block block-1"
                                        style="
                                          height: 35px;
                                          line-height: 35px;
                                          font-size: 1px;
                                        "
                                      >
                                         
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table class="button_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0" cellpadding="10" border="0">
                      <tbody><tr>
                        <td class="pad">
                          <div class="alignment" align="center"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${`${process.env.CLIENT_URL}/order?checkout_session=${existing.checkout_session}`}" style="height:44px;width:237px;v-text-anchor:middle;" arcsize="10%" strokeweight="0.75pt" strokecolor="#010101" fill="false"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#010101; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a href="${`${process.env.STRAPI_URL}/admin/content-manager/collectionType/api::order.order/${existing.id}`}" target="_blank" style="text-decoration:none;display:inline-block;color:#010101;background-color:transparent;border-radius:4px;width:auto;border-top:1px solid #010101;font-weight:undefined;border-right:1px solid #010101;border-bottom:1px solid #010101;border-left:1px solid #010101;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:40px;padding-right:40px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="word-break: break-word; line-height: 32px;">Schimbă statusul comenzi</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-4"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="100%"
                                    >
                                      <div
                                        class="spacer_block block-1"
                                        style="
                                          height: 35px;
                                          line-height: 35px;
                                          font-size: 1px;
                                        "
                                      >
                                         
                                      </div>
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="heading_block block-2"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td
                                            class="pad"
                                            style="
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              text-align: center;
                                              width: 100%;
                                            "
                                          >
                                            <h1
                                              style="
                                                margin: 0;
                                                color: #010101;
                                                direction: ltr;
                                                font-family: Arial, Helvetica Neue,
                                                  Helvetica, sans-serif;
                                                font-size: 34px;
                                                font-weight: normal;
                                                letter-spacing: normal;
                                                line-height: 120%;
                                                text-align: center;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                              "
                                            >
                                              <strong>Sumar comandă</strong>
                                            </h1>
                                          </td>
                                        </tr>
                                      </table>
                                      <div
                                        class="spacer_block block-3"
                                        style="
                                          height: 25px;
                                          line-height: 25px;
                                          font-size: 1px;
                                        "
                                      >
                                         
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-5"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="41.666666666666664%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #cc835c;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: left;
                                                    mso-line-height-alt: 24px;
                                                  "
                                                >
                                                  <span style="font-size: 16px"
                                                    >Nr. #${existing.id}<br
                                                  /></span>
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                    <td
                                      class="column column-2"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="58.333333333333336%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #cc835c;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: right;
                                                    mso-line-height-alt: 24px;
                                                  "
                                                >
                                                  <span style="font-size: 16px"
                                                    >${new Date().toLocaleDateString(
                                                      "ro-RO"
                                                    )}</span
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <!-- first ________________________________________________________________________________-->
                     <div >
                         ${products.map((product) => {
                           return `<div>
                               <table
                                 align="center"
                                 border="0"
                                 cellpadding="0"
                                 cellspacing="0"
                                 class="row row-6"
                                 role="presentation"
                                 style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-position: center top;
                        "
                                 width="100%"
                               >
                                 <tbody>
                                   <tr>
                                     <td>
                                       <table
                                         align="center"
                                         border="0"
                                         cellpadding="0"
                                         cellspacing="0"
                                         class="row-content stack"
                                         role="presentation"
                                         style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  background-color: #cfdddf;
                                  color: #000000;
                                  width: 680px;
                                "
                                         width="680"
                                       >
                                         <tbody>
                                           <tr>
                                             <td
                                               class="column column-1"
                                               style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        background-color: #b2c1c3;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                               width="25%"
                                             >
                                               <div
                                                 class="spacer_block block-1"
                                                 style="
                                          height: 20px;
                                          line-height: 20px;
                                          font-size: 1px;
                                        "
                                               >
                                                  
                                               </div>
                                               <table
                                                 border="0"
                                                 cellpadding="0"
                                                 cellspacing="0"
                                                 class="image_block block-2"
                                                 role="presentation"
                                                 style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                                 width="100%"
                                               >
                                                 <tr>
                                                   <td
                                                     class="pad"
                                                     style="
                                              width: 100%;
                                              padding-right: 0px;
                                              padding-left: 0px;
                                            "
                                                   >
                                                     <div
                                                       align="center"
                                                       class="alignment"
                                                       style="line-height: 10px"
                                                     > <a
                                                     href="${
                                                       product.location &&
                                                       product.location.includes(
                                                         "http"
                                                       )
                                                         ? `${product.location}`
                                                         : `${process.env.CLIENT_URL}`
                                                     }"
                                                     rel="noopener"
                                                     style="text-decoration: none; color: #ffffff"
                                                     target="_blank"
                                                     >
                                                       <img
                                                         alt="${product.name}"
                                                         class="fullMobileWidth"
                                                         source="${`${process.env.CLIENT_URL}/images/${product.art_id}/image-0.jpg}`}"
                                                         src="https://i.postimg.cc/tCBC40k4/spa-product.png"
                                                         style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                  width: 136px;
                                                  max-width: 100%;
                                                "
                                                         title="${product.name}"
                                                         width="136"
                                                       /></a>
                                                     </div>
                                                   </td>
                                                 </tr>
                                               </table>
                                               <div
                                                 class="spacer_block block-3"
                                                 style="
                                          height: 20px;
                                          line-height: 20px;
                                          font-size: 1px;
                                        "
                                               >
                                                  
                                               </div>
                                             </td>
                                             <td
                                               class="column column-2"
                                               style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                               width="41.666666666666664%"
                                             >
                                               <div
                                                 class="spacer_block block-1"
                                                 style="
                                          height: 30px;
                                          line-height: 30px;
                                          font-size: 1px;
                                        "
                                               >
                                                  
                                               </div>
                                               <table
                                                 border="0"
                                                 cellpadding="0"
                                                 cellspacing="0"
                                                 class="heading_block block-2"
                                                 role="presentation"
                                                 style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                                 width="100%"
                                               >
                                                 <tr>
                                                   <td
                                                     class="pad"
                                                     style="
                                              padding-bottom: 10px;
                                              padding-left: 15px;
                                              padding-right: 10px;
                                              text-align: center;
                                              width: 100%;
                                            "
                                                   >
                                                     <h1
                                                       style="
                                                margin: 0;
                                                color: #010101;
                                                direction: ltr;
                                                font-family: Arial, Helvetica Neue,
                                                  Helvetica, sans-serif;
                                                font-size: 24px;
                                                font-weight: normal;
                                                letter-spacing: normal;
                                                line-height: 120%;
                                                text-align: left;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                              "
                                                     ><a
                                                     href="${
                                                       product.slug
                                                         ? `${process.env.CLIENT_URL}/products/${product.slug}`
                                                         : `${process.env.CLIENT_URL}`
                                                     }"
                                                     rel="noopener"
                                                     style="text-decoration: none; color: #ffffff"
                                                     target="_blank"
                                                     >
                                                       <strong>
                                                         ${product.name}
                                                       </strong></a>
                                                     </h1>
                                                   </td>
                                                 </tr>
                                               </table>
                                               <table
                                                 border="0"
                                                 cellpadding="0"
                                                 cellspacing="0"
                                                 class="text_block block-3"
                                                 role="presentation"
                                                 style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                                 width="100%"
                                               >
                                                 <tr>
                                                   <td
                                                     class="pad"
                                                     style="
                                              padding-bottom: 10px;
                                              padding-left: 15px;
                                              padding-right: 10px;
                                              padding-top: 10px;
                                            "
                                                   >
                                                     <div style="font-family: sans-serif">
                                                       <div
                                                         class=""
                                                         style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #393d47;
                                                  line-height: 1.5;
                                                "
                                                       >
                                                         <p
                                                           style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: left;
                                                    mso-line-height-alt: 21px;
                                                  "
                                                         >
                                                          ${
                                                            product.desc
                                                              ? `${product.desc.slice(
                                                                  0,
                                                                  100
                                                                )}...`
                                                              : ""
                                                          }
                                                         </p>
                                                       </div>
                                                     </div>
                                                   </td>
                                                 </tr>
                                               </table>
                                               <table class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														                         <tbody><tr>
															                         <td class="pad">
																                          <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
																	                       <p style="margin: 0;"><strong>cantitate: ${
                                                           product.quantity
                                                         }</strong></p>
																                            </div>
															                                 </td>
														                                       </tr>
													                                      </tbody></table>
                                                                <table class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
                                                                <tbody><tr>
                                                                  <td class="pad">
                                                                     <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
                                                                    <p style="margin: 0;"><strong>preț pe bucată: ${(
                                                                      product.price /
                                                                      100
                                                                    ).toFixed(
                                                                      2
                                                                    )} </strong></p>
                                                                       </div>
                                                                          </td>
                                                                              </tr>
                                                                           </tbody></table>
                                             </td>
                                             <td
                                               class="column column-3"
                                               style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                               width="16.666666666666668%"
                                             >
                                               <div
                                                 class="spacer_block block-1"
                                                 style="
                                          height: 0px;
                                          line-height: 0px;
                                          font-size: 1px;
                                        "
                                               >
                                                  
                                               </div>
                                             </td>
                                             <td
                                               class="column column-4"
                                               style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                               width="16.666666666666668%"
                                             >
                                               <div
                                                 class="spacer_block block-1"
                                                 style="
                                          height: 35px;
                                          line-height: 35px;
                                          font-size: 1px;
                                        "
                                               >
                                                  
                                               </div>
                                               <table
                                                 border="0"
                                                 cellpadding="0"
                                                 cellspacing="0"
                                                 class="heading_block block-2"
                                                 role="presentation"
                                                 style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                                 width="100%"
                                               >
                                                 <tr>
                                                   <td
                                                     class="pad"
                                                     style="
                                              padding-bottom: 15px;
                                              padding-left: 10px;
                                              padding-right: 10px;
                                              text-align: center;
                                              width: 100%;
                                            "
                                                   >
                                                     <h1
                                                       style="
                                                margin: 0;
                                                color: #010101;
                                                direction: ltr;
                                                font-family: Arial, Helvetica Neue,
                                                  Helvetica, sans-serif;
                                                font-size: 18px;
                                                font-weight: normal;
                                                letter-spacing: normal;
                                                line-height: 120%;
                                                text-align: left;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                              "
                                                     >
                                                       <strong>
                                                         ${(
                                                           (product.price *
                                                             product.quantity) /
                                                           100
                                                         ).toFixed(2)} lei
                                                       </strong>
                                                     </h1>
                                                   </td>
                                                 </tr>
                                               </table>
                                             </td>
                                           </tr>
                                         </tbody>
                                       </table>
                                     </td>
                                   </tr>
                                 </tbody>
                               </table>
                               <table
                                 align="center"
                                 border="0"
                                 cellpadding="0"
                                 cellspacing="0"
                                 class="row row-7"
                                 role="presentation"
                                 style="
                          mso-table-lspace: 0pt;
                          mso-table-rspace: 0pt;
                          background-color: #e1f0f1;
                        "
                                 width="100%"
                               >
                                 <tbody>
                                   <tr>
                                     <td>
                                       <table
                                         align="center"
                                         border="0"
                                         cellpadding="0"
                                         cellspacing="0"
                                         class="row-content stack"
                                         role="presentation"
                                         style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                         width="680"
                                       >
                                         <tbody>
                                           <tr>
                                             <td
                                               class="column column-1"
                                               style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                               width="100%"
                                             >
                                               <div
                                                 class="spacer_block block-1"
                                                 style="
                                          height: 25px;
                                          line-height: 25px;
                                          font-size: 1px;
                                        "
                                               >
                                                  
                                               </div>
                                             </td>
                                           </tr>
                                         </tbody>
                                       </table>
                                     </td>
                                   </tr>
                                 </tbody>
                               </table>
                             </div>`;
                         })}
                       </div>
                      <!-- final ------------------------------------------- -->
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-12"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="41.666666666666664%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #cc835c;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: left;
                                                    mso-line-height-alt: 21px;
                                                  "
                                                >
                                                  <strong
                                                    ><span style="font-size: 16px"
                                                      >Sumar comanda<br /></span
                                                  ></strong>
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                    <td
                                      class="column column-2"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-bottom: 5px;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="58.333333333333336%"
                                    >
                                      <div
                                        class="spacer_block block-1"
                                        style="
                                          height: 0px;
                                          line-height: 0px;
                                          font-size: 1px;
                                        "
                                      >
                                         
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-13"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="41.666666666666664%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #010101;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: left;
                                                    mso-line-height-alt: 24px;
                                                  "
                                                >
                                                  <span style="font-size: 16px"
                                                    >Sub total</span
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                    <td
                                      class="column column-2"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        padding-top: 5px;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="58.333333333333336%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #010101;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: right;
                                                    mso-line-height-alt: 24px;
                                                  "
                                                >
                                                  <span style="font-size: 16px"
                                                    >${(total / 100).toFixed(
                                                      2
                                                    )} lei<br
                                                  /></span>
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-14"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="100%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="divider_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div align="center" class="alignment">
                                              <table
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="
                                                  mso-table-lspace: 0pt;
                                                  mso-table-rspace: 0pt;
                                                "
                                                width="100%"
                                              >
                                                <tr>
                                                  <td
                                                    class="divider_inner"
                                                    style="
                                                      font-size: 1px;
                                                      line-height: 1px;
                                                      border-top: 1px solid #bbbbbb;
                                                    "
                                                  >
                                                    <span> </span>
                                                  </td>
                                                </tr>
                                              </table>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-15"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  color: #000000;
                                  width: 680px;
                                "
                                width="680"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="column column-1"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="41.666666666666664%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #010101;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    mso-line-height-alt: 21px;
                                                  "
                                                >
                                                  Cost livrare și procesare:
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-2"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #010101;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: left;
                                                    mso-line-height-alt: 21px;
                                                  "
                                                >
                                                  <strong
                                                    ><span style="font-size: 16px"
                                                      >Total</span
                                                    ></strong
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                    <td
                                      class="column column-2"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                      "
                                      width="58.333333333333336%"
                                    >
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-1"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #010101;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: right;
                                                    mso-line-height-alt: 24px;
                                                  "
                                                >
                                                  <span style="font-size: 16px"
                                                    >${(shipping / 100).toFixed(
                                                      2
                                                    )}
                                                    lei</span
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                      <table
                                        border="0"
                                        cellpadding="10"
                                        cellspacing="0"
                                        class="text_block block-2"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          word-break: break-word;
                                        "
                                        width="100%"
                                      >
                                        <tr>
                                          <td class="pad">
                                            <div style="font-family: sans-serif">
                                              <div
                                                class=""
                                                style="
                                                  font-size: 14px;
                                                  font-family: Arial, Helvetica Neue,
                                                    Helvetica, sans-serif;
                                                  mso-line-height-alt: 21px;
                                                  color: #010101;
                                                  line-height: 1.5;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: right;
                                                    mso-line-height-alt: 24px;
                                                  "
                                                >
                                                  <span style="font-size: 16px"
                                                    ><span style="font-size: 20px"
                                                      ><strong
                                                        >${(
                                                          (total + shipping) /
                                                          100
                                                        ).toFixed(
                                                          2
                                                        )} lei</strong
                                                      ></span
                                                    ><br
                                                  /></span>
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table class="row row-15" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
						<tbody>
							<tr>
								<td>
									<table class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680" cellspacing="0" cellpadding="0" border="0" align="center">
										<tbody>
											<tr>
												<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="41.666666666666664%">
													<table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														<tbody><tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #cc835c; line-height: 1.5;">
																		<p style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 21px;"><strong><span style="font-size:16px;">Detalii livrare:<br></span></strong></p>
																	</div>
																</div>
															</td>
														</tr>
													</tbody></table>
												</td>
												<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="58.333333333333336%">
													<div class="spacer_block block-1" style="height:0px;line-height:0px;font-size:1px;"> </div>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
          <table class="row row-16" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
						<tbody>
							<tr>
								<td>
									<table class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680" cellspacing="0" cellpadding="0" border="0" align="center">
										<tbody>
											<tr>
												<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="41.666666666666664%">
													<table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														<tbody><tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
																		<p style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 24px;"><span style="font-size:16px;">Nume:</span></p>
																	</div>
																</div>
															</td>
														</tr>
													</tbody></table>
												</td>
												<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="58.333333333333336%">
													<table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														<tbody><tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
																		<p style="margin: 0; font-size: 14px; text-align: right; mso-line-height-alt: 24px;"><span style="font-size:16px;">${
                                      existing.name
                                    }<br></span></p>
																	</div>
																</div>
															</td>
														</tr>
													</tbody>
                          </table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
          <table class="row row-17" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
						<tbody>
							<tr>
								<td>
									<table class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680" cellspacing="0" cellpadding="0" border="0" align="center">
										<tbody>
											<tr>
												<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="41.666666666666664%">
													<table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														<tbody><tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
																		<p style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 24px;"><span style="font-size:16px;">Telefon:</span></p>
																	</div>
																</div>
															</td>
														</tr>
													</tbody></table>
												</td>
												<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="58.333333333333336%">
													<table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														<tbody><tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
																		<p style="margin: 0; font-size: 14px; text-align: right; mso-line-height-alt: 24px;"><span style="font-size:16px;">${
                                      existing.phone
                                    }<br></span></p>
																	</div>
																</div>
															</td>
														</tr>
													</tbody></table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
          <table class="row row-18" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
						<tbody>
							<tr>
								<td>
									<table class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680" cellspacing="0" cellpadding="0" border="0" align="center">
										<tbody>
											<tr>
												<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="41.666666666666664%">
													<table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														<tbody><tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
																		<p style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 24px;"><span style="font-size:16px;">Adresă:</span></p>
																	</div>
																</div>
															</td>
														</tr>
													</tbody></table>
												</td>
												<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="58.333333333333336%">
													<table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
														<tbody><tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
																		<p style="margin: 0; font-size: 14px; text-align: right; mso-line-height-alt: 24px;"><span style="font-size:16px;">${
                                      existing.address
                                    }<br></span></p>
																	</div>
																</div>
															</td>
														</tr>
													</tbody></table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
          <table class="row row-18" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
<tbody>
  <tr>
    <td>
      <table class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 680px;" width="680" cellspacing="0" cellpadding="0" border="0" align="center">
        <tbody>
          <tr>
            <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="41.666666666666664%">
              <table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
                <tbody><tr>
                  <td class="pad">
                    <div style="font-family: sans-serif">
                      <div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
                        <p style="margin: 0; font-size: 14px; text-align: left; mso-line-height-alt: 24px;"><span style="font-size:16px;">Plată:</span></p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody></table>
            </td>
            <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="58.333333333333336%">
              <table class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%" cellspacing="0" cellpadding="10" border="0">
                <tbody><tr>
                  <td class="pad">
                    <div style="font-family: sans-serif">
                      <div class="" style="font-size: 14px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 21px; color: #010101; line-height: 1.5;">
                        <p style="margin: 0; font-size: 14px; text-align: right; mso-line-height-alt: 24px;"><span style="font-size:16px;">${
                          existing.payment_method === "online"
                            ? `Online Stripe Payments`
                            : `Ramburs`
                        }<br></span></p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
</table>
         
         
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <!-- End -->
              <p style="padding:10px;"> ${new Date()}</p>
            </body>
            <footer><table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row row-16"
            role="presentation"
            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row-content stack"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      color: #000000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          "
                          width="100%"
                        >
                          <div
                            class="spacer_block block-1"
                            style="height: 25px; line-height: 25px; font-size: 1px"
                          >
                             
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row row-17"
            role="presentation"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              background-color: #010101;
            "
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row-content stack"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      color: #000000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          "
                          width="100%"
                        >
                          <div
                            class="spacer_block block-1"
                            style="height: 65px; line-height: 65px; font-size: 1px"
                          >
                             
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row row-18"
            role="presentation"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              background-color: #010101;
            "
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row-content stack"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      color: #000000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          "
                          width="33.333333333333336%"
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="icons_block block-1"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  vertical-align: middle;
                                  color: #000000;
                                  font-family: inherit;
                                  font-size: 14px;
                                  padding-left: 10px;
                                  text-align: left;
                                "
                              >
                                <table
                                  align="left"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="alignment"
                                  role="presentation"
                                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                                >
                                  <tr>
                                    <td
                                      style="
                                        vertical-align: middle;
                                        text-align: center;
                                        padding-top: 5px;
                                        padding-bottom: 5px;
                                        padding-left: 5px;
                                        padding-right: 5px;
                                      "
                                    >
                                      <img
                                        align="center"
                                        alt="Company Logo"
                                        class="icon"
                                        height="64"
                                        src="https://i.postimg.cc/NG6c7YWP/logo-art.png"
                                        style="
                                          display: block;
                                          height: auto;
                                          margin: 0 auto;
                                          border: 0;
                                        "
                                        width="64"
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="text_block block-2"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              word-break: break-word;
                            "
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  padding-bottom: 20px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 10px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    class=""
                                    style="
                                      font-size: 14px;
                                      font-family: Arial, Helvetica Neue, Helvetica,
                                        sans-serif;
                                      mso-line-height-alt: 25.2px;
                                      color: #fbfbfb;
                                      line-height: 1.8;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: left;
                                        mso-line-height-alt: 25.2px;
                                      "
                                    >
                                      Reparăm, recondiționăm și revitalizăm<br />aroma
                                      cafelei tale!
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td
                          class="column column-2"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          "
                          width="33.333333333333336%"
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="heading_block block-1"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  padding-bottom: 20px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  text-align: center;
                                  width: 100%;
                                "
                              >
                                <h1
                                  style="
                                    margin: 0;
                                    color: #ffffff;
                                    direction: ltr;
                                    font-family: Arial, Helvetica Neue, Helvetica,
                                      sans-serif;
                                    font-size: 18px;
                                    font-weight: normal;
                                    letter-spacing: normal;
                                    line-height: 120%;
                                    text-align: left;
                                    margin-top: 0;
                                    margin-bottom: 0;
                                  "
                                >
                                  <strong>Link-uri Art Cafe</strong>
                                </h1>
                              </td>
                            </tr>
                          </table>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="text_block block-2"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              word-break: break-word;
                            "
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  padding-bottom: 20px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 10px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    class=""
                                    style="
                                      font-size: 14px;
                                      font-family: Arial, Helvetica Neue, Helvetica,
                                        sans-serif;
                                      mso-line-height-alt: 25.2px;
                                      color: #fbfbfb;
                                      line-height: 1.8;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: left;
                                        mso-line-height-alt: 25.2px;
                                      "
                                    >
                                      <a
                                        href="${`${process.env.CLIENT_URL}`}"
                                        rel="noopener"
                                        style="text-decoration: none; color: #ffffff"
                                        target="_blank"
                                        >Produse</a
                                      >
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="text_block block-3"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              word-break: break-word;
                            "
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  padding-bottom: 20px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 10px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    class=""
                                    style="
                                      font-size: 14px;
                                      font-family: Arial, Helvetica Neue, Helvetica,
                                        sans-serif;
                                      mso-line-height-alt: 25.2px;
                                      color: #fbfbfb;
                                      line-height: 1.8;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: left;
                                        mso-line-height-alt: 25.2px;
                                      "
                                    >
                                      <a
                                        href="${`${process.env.CLIENT_URL}/reparo`}"
                                        rel="noopener"
                                        style="text-decoration: none; color: #ffffff"
                                        target="_blank"
                                        >Reparo</a
                                      >
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="text_block block-4"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              word-break: break-word;
                            "
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  padding-bottom: 20px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 10px;
                                "
                              >
                                <div style="font-family: sans-serif">
                                  <div
                                    class=""
                                    style="
                                      font-size: 14px;
                                      font-family: Arial, Helvetica Neue, Helvetica,
                                        sans-serif;
                                      mso-line-height-alt: 25.2px;
                                      color: #fbfbfb;
                                      line-height: 1.8;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        font-size: 14px;
                                        text-align: left;
                                        mso-line-height-alt: 25.2px;
                                      "
                                    >
                                      <a
                                        href="${`${process.env.CLIENT_URL}/contact`}"
                                        rel="noopener"
                                        style="text-decoration: none; color: #ffffff"
                                        target="_blank"
                                        >Contact us</a
                                      >
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td
                          class="column column-3"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          "
                          width="33.333333333333336%"
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="heading_block block-1"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  padding-bottom: 20px;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  text-align: center;
                                  width: 100%;
                                "
                              >
                                <h1
                                  style="
                                    margin: 0;
                                    color: #ffffff;
                                    direction: ltr;
                                    font-family: Arial, Helvetica Neue, Helvetica,
                                      sans-serif;
                                    font-size: 18px;
                                    font-weight: normal;
                                    letter-spacing: normal;
                                    line-height: 120%;
                                    text-align: left;
                                    margin-top: 0;
                                    margin-bottom: 0;
                                  "
                                >
                                  <strong>Social Media</strong>
                                </h1>
                              </td>
                            </tr>
                          </table>
                          <table
                            border="0"
                            cellpadding="10"
                            cellspacing="0"
                            class="social_block block-2"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                            width="100%"
                          >
                            <tr>
                              <td class="pad">
                                <div align="left" class="alignment">
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    class="social-table"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      display: inline-block;
                                    "
                                    width="144px"
                                  >
                                    <tr>
                                      <td style="padding: 0 4px 0 0">
                                        <a
                                          href="https://www.facebook.com/"
                                          target="_blank"
                                          ><img
                                            alt="Facebook"
                                            height="32"
                                            src="https://i.postimg.cc/KzgsyRRb/facebook2x.png"
                                            style="
                                              display: block;
                                              height: auto;
                                              border: 0;
                                            "
                                            title="facebook"
                                            width="32"
                                        /></a>
                                      </td>
                                      <td style="padding: 0 4px 0 0">
                                        <a href="https://www.twitter.com/" target="_blank"
                                          ><img
                                            alt="Twitter"
                                            height="32"
                                            src="https://i.postimg.cc/YqxDkcqv/twitter2x.png"
                                            style="
                                              display: block;
                                              height: auto;
                                              border: 0;
                                            "
                                            title="twitter"
                                            width="32"
                                        /></a>
                                      </td>
                                      <td style="padding: 0 4px 0 0">
                                        <a
                                          href="https://www.linkedin.com/"
                                          target="_blank"
                                          ><img
                                            alt="Linkedin"
                                            height="32"
                                            src="https://i.postimg.cc/1Xh7Rsqq/linkedin2x.png"
                                            style="
                                              display: block;
                                              height: auto;
                                              border: 0;
                                            "
                                            title="linkedin"
                                            width="32"
                                        /></a>
                                      </td>
                                      <td style="padding: 0 4px 0 0">
                                        <a
                                          href="https://www.instagram.com/"
                                          target="_blank"
                                          ><img
                                            alt="Instagram"
                                            height="32"
                                            src="https://i.postimg.cc/MH7PvN7r/instagram2x.png"
                                            style="
                                              display: block;
                                              height: auto;
                                              border: 0;
                                            "
                                            title="instagram"
                                            width="32"
                                        /></a>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row row-19"
            role="presentation"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              background-color: #010101;
            "
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row-content stack"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      color: #000000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          "
                          width="100%"
                        >
                          <div
                            class="spacer_block block-1"
                            style="height: 65px; line-height: 65px; font-size: 1px"
                          >
                             
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="row row-20"
            role="presentation"
            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
            width="100%"
          >
            <tbody>
              <tr>
                <td>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="row-content stack"
                    role="presentation"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      color: #000000;
                      width: 680px;
                    "
                    width="680"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="column column-1"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            font-weight: 400;
                            text-align: left;
                            padding-bottom: 5px;
                            padding-top: 5px;
                            vertical-align: top;
                            border-top: 0px;
                            border-right: 0px;
                            border-bottom: 0px;
                            border-left: 0px;
                          "
                          width="100%"
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            class="icons_block block-1"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                            width="100%"
                          >
                            <tr>
                              <td
                                class="pad"
                                style="
                                  vertical-align: middle;
                                  color: #9d9d9d;
                                  font-family: inherit;
                                  font-size: 15px;
                                  padding-bottom: 5px;
                                  padding-top: 5px;
                                  text-align: center;
                                "
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      class="alignment"
                                      style="vertical-align: middle; text-align: center"
                                    >
                                      <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                      <!--[if !vml]><!-->
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="icons-inner"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          display: inline-block;
                                          margin-right: -4px;
                                          padding-left: 0px;
                                          padding-right: 0px;
                                        "
                                      >
                                        <!--<![endif]-->
                                        <tr>
                                          <td
                                            style="
                                              vertical-align: middle;
                                              text-align: center;
                                              padding-top: 5px;
                                              padding-bottom: 5px;
                                              padding-left: 5px;
                                              padding-right: 6px;
                                            "
                                          >
                                            <a
                                              href="https://www.designedwithbee.com/"
                                              style="text-decoration: none"
                                              target="_blank"
                                              ><img
                                                align="center"
                                                alt="Designed with BEE"
                                                class="icon"
                                                height="32"
                                                src="https://i.postimg.cc/KYjHJ9bR/bee.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  margin: 0 auto;
                                                  border: 0;
                                                "
                                                width="34"
                                            /></a>
                                          </td>
                                          <td
                                            style="
                                              font-family: Arial, Helvetica Neue,
                                                Helvetica, sans-serif;
                                              font-size: 15px;
                                              color: #9d9d9d;
                                              vertical-align: middle;
                                              letter-spacing: undefined;
                                              text-align: center;
                                            "
                                          >
                                            <a
                                              href="https://www.designedwithbee.com/"
                                              style="
                                                color: #9d9d9d;
                                                text-decoration: none;
                                              "
                                              target="_blank"
                                              >Designed by Art dev with BEE</a
                                            >
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          </footer>
          </html>
         
          
        `,
        };
        await strapi.plugin("email").service("email").send(emailOptions);
        strapi.log.debug(`Email sent to ${sendToAdmin}`);
      } catch (err) {
        strapi.log.error(`Error sending email to ${sendToAdmin}`, err);
      }
    }
  },
};
